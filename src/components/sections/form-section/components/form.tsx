"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSectionSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(8, "Favor informar o telefone"),
  gender: z
    .string()
    .refine((val) => val !== "select-gender", "Selecione um gênero"),
  state: z.string().refine((val) => val !== "state", "Selecione um estado"),
  position: z
    .string()
    .refine((val) => val !== "position", "Selecione um cargo"),
  company: z
    .string()
    .min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
});

type FormSectionSchema = z.infer<typeof formSectionSchema>;

const states = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
];

export function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormSectionSchema>({
    resolver: zodResolver(formSectionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gender: "select-gender",
      state: "state",
      position: "position",
      company: "",
    },
  });

  async function handleSubmitForm(data: FormSectionSchema) {
    setIsSubmitting(true);
    const loadingToast = toast.loading("Enviando inscrição...");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      toast.dismiss(loadingToast);

      if (response.ok) {
        toast.success("Inscrição realizada com sucesso! Bem-vinda!");
        reset();
      } else {
        const errorData = await response.json();
        console.error("Erro ao inscrever:", errorData);
        toast.error("Ops! Ocorreu um erro. Tente novamente.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Erro inesperado:", error);
      toast.error("Ops! Ocorreu um erro de conexão. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="border-[#E7E0E2] w-full lg:h-auto bg-white z-10 shadow-none">
      <CardHeader>
        <CardTitle className="text-[#2E1118] text-[22px] font-semibold">
          Preencha o formulário abaixo!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          {/* ... (outros campos do formulário) ... */}
          <div className="flex flex-col gap-[6px]">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-[6px]">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="Seu melhor e-mail"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="lg:grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-[6px]">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(00) 0000-0000"
                {...register("phone")}
                disabled={isSubmitting}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-[6px] w-full mt-4 lg:mt-0">
              <Label htmlFor="gender">Gênero</Label>
              <Select
                value={watch("gender")}
                onValueChange={(value) =>
                  setValue("gender", value, { shouldValidate: true })
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="gender">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="select-gender">
                    Selecione o gênero
                  </SelectItem>
                  <SelectItem value="feminino">Feminino</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && (
                <span className="text-red-500 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-[6px]">
              <Label htmlFor="state">Estado - UF</Label>
              <Select
                value={watch("state")}
                onValueChange={(value) =>
                  setValue("state", value, { shouldValidate: true })
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="state">Selecione o estado</SelectItem>
                  {states.map((uf) => (
                    <SelectItem key={uf} value={uf.toLowerCase()}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-[6px] mt-4 lg:mt-0">
              <Label htmlFor="position">Cargo</Label>
              <Select
                value={watch("position")}
                onValueChange={(value) =>
                  setValue("position", value, { shouldValidate: true })
                }
                disabled={isSubmitting}
              >
                <SelectTrigger id="position">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="position">Selecione o cargo</SelectItem>
                  <SelectItem value="ceo">CEO</SelectItem>
                  <SelectItem value="cto">CTO</SelectItem>
                  <SelectItem value="cfo">CFO</SelectItem>
                  <SelectItem value="diretor-rh">Diretor de RH</SelectItem>
                  <SelectItem value="gerente-rh">Gerente de RH</SelectItem>
                  <SelectItem value="coordenador-rh">
                    Coordenador de RH
                  </SelectItem>
                  <SelectItem value="analista-rh">Analista de RH</SelectItem>
                  <SelectItem value="assistente-rh">
                    Assistente de RH
                  </SelectItem>
                  <SelectItem value="estagiario-rh">
                    Estagiário de RH
                  </SelectItem>
                  <SelectItem value="outro">Outro</SelectItem>
                </SelectContent>
              </Select>
              {errors.position && (
                <span className="text-red-500 text-sm">
                  {errors.position.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[6px]">
            <Label htmlFor="company">Empresa</Label>
            <Input
              id="company"
              type="text"
              placeholder="Nome da empresa"
              {...register("company")}
              disabled={isSubmitting}
            />
            {errors.company && (
              <span className="text-red-500 text-sm">
                {errors.company.message}
              </span>
            )}
          </div>

          <Button
            type="submit"
            className="bg-[#C40D3A] hover:bg-[#d21444] text-white rounded-full font-medium h-12 w-full duration-300 mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
