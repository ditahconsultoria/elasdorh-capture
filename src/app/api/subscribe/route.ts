import { NextResponse } from "next/server";
import { z } from "zod";

const formSectionSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Favor informar o telefone"),
  gender: z.string(),
  state: z.string(),
  position: z.string(),
  company: z.string(),
});

export async function POST(request: Request) {
  const startTime = Date.now();
  
  try {
    const apiKey = process.env.ACTIVE_CAMPAIGN_API_KEY;
    const apiUrl = process.env.ACTIVE_CAMPAIGN_API_URL;

    // Log inicial para diagnóstico
    console.log(`[${new Date().toISOString()}] 🚀 Iniciando processo de inscrição`);
    console.log(`📍 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 API URL configurada: ${apiUrl ? 'SIM' : 'NÃO'}`);
    console.log(`🔑 API Key configurada: ${apiKey ? 'SIM' : 'NÃO'}`);

    if (!apiKey || !apiUrl) {
      console.error("❌ Credenciais não configuradas");
      return NextResponse.json(
        { error: "Credenciais da API não configuradas no servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();
    console.log(`📝 Dados recebidos:`, {
      name: body.name,
      email: body.email,
      phone: body.phone,
    });

    const parsedData = formSectionSchema.safeParse(body);
    if (!parsedData.success) {
      console.error("❌ Dados inválidos:", parsedData.error.flatten());
      return NextResponse.json(
        { error: "Dados inválidos.", details: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, gender, state, position, company } = parsedData.data;
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    const contactPayload = {
      contact: {
        email: email,
        firstName: firstName,
        lastName: lastName || "",
        phone: phone,
        fieldValues: [
          { field: "2", value: company },
          { field: "4", value: gender },
          { field: "5", value: position },
          { field: "6", value: state },
        ],
      },
    };

    console.log(`📦 Payload preparado para Active Campaign:`, JSON.stringify(contactPayload, null, 2));

    const requestUrl = `${apiUrl}/api/3/contact/sync`;
    console.log(`🎯 URL da requisição: ${requestUrl}`);

    // Fazendo a requisição com timeout e headers mais robustos
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Api-Token": apiKey,
          "Content-Type": "application/json",
          "Accept": "application/json",
          "User-Agent": "NextJS-ActiveCampaign-Integration/1.0",
        },
        body: JSON.stringify(contactPayload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseTime = Date.now() - startTime;
      console.log(`⏱️  Tempo de resposta: ${responseTime}ms`);
      console.log(`📊 Status da resposta: ${response.status}`);
      console.log(`📋 Headers da resposta:`, Object.fromEntries(response.headers.entries()));

      const responseText = await response.text();
      console.log(`📄 Corpo da resposta (raw):`, responseText);

      let responseData;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ Erro ao parsear resposta JSON:", parseError);
        responseData = { raw: responseText };
      }

      if (!response.ok) {
        console.error(`❌ Erro na API do ActiveCampaign (${response.status}):`, responseData);
        
        let errorMessage = "Falha ao registrar o contato.";
        if (response.status === 429) {
          errorMessage = "Muitas requisições. Tente novamente em alguns minutos.";
        } else if (response.status === 401) {
          errorMessage = "Credenciais inválidas para Active Campaign.";
        } else if (response.status === 422) {
          errorMessage = "Dados rejeitados pelo Active Campaign.";
        }

        return NextResponse.json(
          { 
            error: errorMessage, 
            details: responseData,
            status: response.status,
            timestamp: new Date().toISOString()
          },
          { status: response.status }
        );
      }

      console.log(`✅ Contato registrado com sucesso:`, responseData);
      return NextResponse.json(
        { 
          message: "Inscrição realizada com sucesso!",
          contactId: responseData?.contact?.id,
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      );

    } catch (fetchError) {
      clearTimeout(timeoutId);
      
      // Type guard para verificar se é AbortError
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        console.error("❌ Timeout na requisição para Active Campaign");
        return NextResponse.json(
          { error: "Timeout na comunicação com Active Campaign. Tente novamente." },
          { status: 408 }
        );
      }
      
      throw fetchError;
    }

  } catch (error) {
    const responseTime = Date.now() - startTime;
    console.error(`❌ Erro interno do servidor (${responseTime}ms):`, {
      message: error instanceof Error ? error.message : 'Erro desconhecido',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown',
      timestamp: new Date().toISOString()
    });

    return NextResponse.json(
      { 
        error: "Ocorreu um erro inesperado.",
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
