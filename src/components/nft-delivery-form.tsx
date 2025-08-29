
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  Image as ImageIcon,
  Loader2,
  Mail,
  User,
  KeyRound,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { verifyFormData } from "@/ai/flows/verify-form-data";
import { submitForm } from "@/lib/actions";

const nfts = [
  {
    id: "nft-1",
    name: "CryptoPunk #7804",
    url: "https://picsum.photos/200/200?random=1",
    price: "4200 ETH",
    dataAiHint: "pixel art",
  },
  {
    id: "nft-2",
    name: "Beeple, The First 5000 Days",
    url: "https://picsum.photos/200/200?random=2",
    price: "$69.3M",
    dataAiHint: "digital collage",
  },
  {
    id: "nft-3",
    name: "Bored Ape Yacht Club #8817",
    url: "https://picsum.photos/200/200?random=3",
    price: "$3.4M",
    dataAiHint: "cartoon ape",
  },
];

const deliveryContract = `
This NFT Delivery Contract ("Contract") is made and entered into as of the submission date by and between the purchaser ("Buyer") and the seller ("Seller").

1.  **Subject Matter:** The Seller agrees to transfer, and the Buyer agrees to receive, the non-fungible token ("NFT") as selected in the form.
2.  **Payment & Delivery:** Upon agreement to these terms, Buyer must complete payment to the designated wallet. The NFT will be delivered to the Buyer's specified wallet address within 24 hours of successful payment verification. The password provided will be required to access the NFT. If payment is not confirmed, this contract is void.
3.  **No Refunds:** All sales are final. The Buyer acknowledges that they have reviewed the NFT and agrees to the terms of this sale. No refunds will be issued for any reason.
4.  **Gas Fees:** The Buyer is responsible for all blockchain transaction fees (gas fees) associated with the transfer of the NFT.
5.  **Ownership:** Upon successful transfer, the Buyer becomes the rightful owner of the NFT, along with all associated rights as defined by the NFT's underlying smart contract.
6.  **Representations:** The Buyer represents that they are not a person or entity barred from using the Ethereum network or receiving NFTs under the laws of any applicable jurisdiction.
7.  **Limitation of Liability:** The Seller shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, goodwill, or other intangible losses.
8.  **Agreement:** By checking the "I agree" box, the Buyer acknowledges that they have read, understood, and agreed to all the terms and conditions outlined in this Contract.
`;

const formSchema = z.object({
  buyerName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  buyerEmail: z.string().email({ message: "Por favor, introduce una dirección de correo electrónico válida." }),
  selectedNft: z.string({ required_error: "Por favor, selecciona un NFT para comprar." }),
  password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres." }),
  termsAgreement: z.literal(true, {
    errorMap: () => ({ message: "Debes aceptar los términos y condiciones." }),
  }),
});

export function NftDeliveryForm() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyerName: "",
      buyerEmail: "",
      password: "",
      termsAgreement: false,
    },
  });

  const termsAgreed = form.watch("termsAgreement");

  async function handlePayment() {
    setIsPaying(true);
    // Simulate wallet connection and payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate a 50/50 chance of payment success
    const paymentSuccess = Math.random() > 0.5;

    if (paymentSuccess) {
      setIsPaid(true);
      toast({
        title: "Pago Exitoso",
        description: "Tu pago ha sido confirmado. Ahora puedes asegurar tu NFT.",
      });
    } else {
      router.push("/error?reason=payment_failed");
    }
    setIsPaying(false);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isPaid) {
      toast({
        variant: "destructive",
        title: "Pago Requerido",
        description: "Debes completar el pago antes de enviar el formulario.",
      });
      return;
    }

    startTransition(async () => {
      const selectedNftObject = nfts.find((nft) => nft.id === values.selectedNft);
      
      const aiInput = {
        ...values,
        selectedNft: JSON.stringify(selectedNftObject)
      };
      
      const aiVerificationResult = await verifyFormData(aiInput);

      if (!aiVerificationResult.isComplete) {
        toast({
          variant: "destructive",
          title: "Formulario Incompleto",
          description: `Por favor, completa los siguientes campos obligatorios: ${aiVerificationResult.missingFields.join(", ")}`,
        });
        return;
      }

      const result = await submitForm(values);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({
          variant: "destructive",
          title: "Envío Fallido",
          description: result.error || "Ocurrió un error desconocido. Por favor, inténtalo de nuevo.",
        });
      }
    });
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-lg shadow-2xl">
        <CardContent className="p-10 text-center flex flex-col items-center gap-6">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">¡Gracias!</h2>
            <p className="text-muted-foreground">
              Tu solicitud de entrega de NFT ha sido enviada. Recibirás una confirmación por correo electrónico en breve.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>Enviar otro formulario</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">NFT Drop Zone</CardTitle>
        <CardDescription className="text-center">
        Completa el formulario para recibir tu NFT. El precio listado incluye las tarifas de acuñación.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buyerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de correo electrónico</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="tu@ejemplo.com" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedNft"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seleccionar NFT</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Elige tu NFT comprado" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {nfts.map((nft) => (
                        <SelectItem key={nft.id} value={nft.id}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={nft.url}
                              alt={nft.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                              data-ai-hint={nft.dataAiHint}
                            />
                            <div>
                              <p className="font-semibold">{nft.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Precio: {nft.price}
                              </p>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña de descarga</FormLabel>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input type="password" placeholder="Crea una contraseña segura" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <h3 className="font-medium">Contrato de Entrega</h3>
              <ScrollArea className="h-40 w-full rounded-md border p-4 text-sm">
                {deliveryContract}
              </ScrollArea>
            </div>
            <FormField
              control={form.control}
              name="termsAgreement"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPaid}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      He leído y acepto los términos del contrato de entrega.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {termsAgreed && !isPaid && (
               <Button
                type="button"
                onClick={handlePayment}
                disabled={isPaying}
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPaying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wallet className="mr-2 h-4 w-4" />
                {isPaying ? "Procesando pago..." : "Pagar con Wallet"}
              </Button>
            )}
            <Button
              type="submit"
              disabled={isPending || !isPaid}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Enviando..." : "Asegurar mi NFT"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
