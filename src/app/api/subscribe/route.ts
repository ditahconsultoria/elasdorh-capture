import { NextResponse } from "next/server";
import { z } from "zod";

// Schema atualizado para incluir TODOS os campos do formulário
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
  try {
    const apiKey = process.env.ACTIVE_CAMPAIGN_API_KEY;
    const apiUrl = process.env.ACTIVE_CAMPAIGN_API_URL;

    if (!apiKey || !apiUrl) {
      return NextResponse.json(
        { error: "Credenciais da API não configuradas no servidor." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const parsedData = formSectionSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", details: parsedData.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, phone, gender, state, position, company } =
      parsedData.data;
    const [firstName, ...lastNameParts] = name.split(" ");
    const lastName = lastNameParts.join(" ");

    // Payload final com as IDs corretas dos campos personalizados
    const contactPayload = {
      contact: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        fieldValues: [
          { field: "2", value: company }, // ID do campo Empresa
          { field: "4", value: gender }, // ID do campo Gênero
          { field: "5", value: position }, // ID do campo Cargo
          { field: "6", value: state }, // ID do campo Estado
        ],
      },
    };

    const response = await fetch(`${apiUrl}/api/3/contacts`, {
      method: "POST",
      headers: {
        "Api-Token": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro na API do ActiveCampaign:", errorData);
      return NextResponse.json(
        { error: "Falha ao registrar o contato.", details: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro interno do servidor:", error);
    return NextResponse.json(
      { error: "Ocorreu um erro inesperado." },
      { status: 500 }
    );
  }
}
