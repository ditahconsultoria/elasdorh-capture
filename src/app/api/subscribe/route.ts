import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const subscribeSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  gender: z.string().min(1, 'Gênero é obrigatório'),
  state: z.string().min(1, 'Estado é obrigatório'),
  position: z.string().min(1, 'Cargo é obrigatório'),
  company: z.string().min(1, 'Empresa é obrigatória'),
})

type SubscribeData = z.infer<typeof subscribeSchema>

// Função para criar/sincronizar contato
async function syncContact(contactData: any) {
  const response = await fetch(`${process.env.ACTIVE_CAMPAIGN_API_URL}/api/3/contact/sync`, {
    method: 'POST',
    headers: {
      'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contact: contactData
    }),
  })

  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`ActiveCampaign sync failed: ${response.status} - ${errorData}`)
  }

  return response.json()
}

// Função para adicionar contato à lista específica
async function addContactToList(contactId: string, listId: string) {
  const response = await fetch(`${process.env.ACTIVE_CAMPAIGN_API_URL}/api/3/contactLists`, {
    method: 'POST',
    headers: {
      'Api-Token': process.env.ACTIVE_CAMPAIGN_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contactList: {
        list: listId,
        contact: contactId,
        status: 1, // 1 = subscribed, 2 = unsubscribed
      },
    }),
  })

  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`ActiveCampaign list subscription failed: ${response.status} - ${errorData}`)
  }

  return response.json()
}

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Validação de configuração
    if (!process.env.ACTIVE_CAMPAIGN_API_URL || !process.env.ACTIVE_CAMPAIGN_API_KEY) {
      console.error('❌ ActiveCampaign configuration missing')
      return NextResponse.json(
        { error: 'Configuração do ActiveCampaign não encontrada' },
        { status: 500 }
      )
    }

    if (!process.env.ACTIVE_CAMPAIGN_LIST_ID) {
      console.error('❌ ActiveCampaign List ID missing')
      return NextResponse.json(
        { error: 'ID da lista do ActiveCampaign não configurado' },
        { status: 500 }
      )
    }

    const body = await request.json()
    console.log('📥 Received subscription request:', { 
      email: body.email, 
      name: body.name,
      timestamp: new Date().toISOString()
    })

    // Validação dos dados
    const validatedData = subscribeSchema.parse(body)

    // Mapeamento dos dados para o ActiveCampaign - CORRIGIDO
    const nameParts = validatedData.name.split(' ')
    const contactData = {
      email: validatedData.email,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      phone: validatedData.phone,
      fieldValues: [
        { field: '2', value: validatedData.company },   // Field 2 = Empresa
        { field: '4', value: validatedData.gender },    // Field 4 = Gênero  
        { field: '5', value: validatedData.position },  // Field 5 = Cargo
        { field: '6', value: validatedData.state },     // Field 6 = Estado
      ],
    }

    console.log('🔄 Syncing contact with ActiveCampaign...')
    console.log('📋 Field mapping:', {
      empresa: `Field 2 = ${validatedData.company}`,
      genero: `Field 4 = ${validatedData.gender}`,
      cargo: `Field 5 = ${validatedData.position}`,
      estado: `Field 6 = ${validatedData.state}`
    })
    
    // Etapa 1: Criar/Sincronizar contato
    const syncResult = await syncContact(contactData)
    const contactId = syncResult.contact?.id
    
    if (!contactId) {
      throw new Error('Contact ID não retornado pelo ActiveCampaign')
    }

    console.log('✅ Contact synced successfully:', { contactId })

    // Etapa 2: Adicionar contato à lista específica
    const listId = process.env.ACTIVE_CAMPAIGN_LIST_ID
    console.log(`🔄 Adding contact ${contactId} to list ${listId}...`)
    
    const listResult = await addContactToList(contactId, listId)
    
    console.log('✅ Contact added to list successfully:', { 
      contactId, 
      listId,
      listSubscriptionId: listResult.contactList?.id
    })

    const processingTime = Date.now() - startTime
    console.log(`🎯 Subscription completed successfully in ${processingTime}ms:`, {
      email: validatedData.email,
      contactId,
      listId,
      processingTimeMs: processingTime
    })

    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      data: {
        contactId,
        listId,
        email: validatedData.email
      }
    })

  } catch (error) {
    const processingTime = Date.now() - startTime
    
    if (error instanceof z.ZodError) {
      console.error('❌ Validation error:', error.issues)
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message
          }))
        },
        { status: 400 }
      )
    }

    console.error('❌ Subscription error:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      processingTimeMs: processingTime,
      timestamp: new Date().toISOString()
    })

    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente.' },
      { status: 500 }
    )
  }
}
