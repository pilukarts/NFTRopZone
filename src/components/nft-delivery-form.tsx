
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
  FileText,
  Languages,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
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
import { translateText } from "@/ai/flows/translate-text";
import { submitForm } from "@/lib/actions";

const nfts = [
  {
    id: "nft-1",
    name: "Galactic Explorer",
    url: "https://i.imgur.com/uGSNZ9e.jpeg",
    price: "2.5 ETH",
    dataAiHint: "astronaut space",
  },
  {
    id: "nft-2",
    name: "Cyber-Samurai",
    url: "https://i.imgur.com/QAv28u4.jpeg",
    price: "3.1 ETH",
    dataAiHint: "samurai futuristic",
  },
  {
    id: "nft-3",
    name: "Neon Overdrive",
    url: "https://i.imgur.com/QKCX7qx.jpeg",
    price: "1.8 ETH",
    dataAiHint: "car night",
  },
  {
    id: 'nft-4',
    name: 'Mystic Feline',
    url: 'https://i.imgur.com/YoiO7mR.jpeg',
    price: '4.2 ETH',
    dataAiHint: 'cat magic',
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

const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
    { value: "de", label: "Deutsch" },
    { value: "zh", label: "中文" },
    { value: "ja", label: "日本語" },
];

const formSchema = z.object({
  buyerName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  buyerEmail: z.string().email({ message: "Please enter a valid email address." }),
  selectedNft: z.string({ required_error: "Please select an NFT to purchase." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  termsAgreement: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions." }),
  }),
  language: z.string().optional(),
});

export function NftDeliveryForm() {
  const [isPending, startTransition] = useTransition();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedContract, setTranslatedContract] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buyerName: "",
      buyerEmail: "",
      password: "",
      termsAgreement: false,
      language: "en",
    },
  });

  const termsAgreed = form.watch("termsAgreement");
  const selectedLanguage = form.watch("language");

  async function handlePayment() {
    setIsPaying(true);
    // Simulate wallet connection and payment
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate a 50/50 chance of payment success
    const paymentSuccess = Math.random() > 0.5;

    if (paymentSuccess) {
      setIsPaid(true);
      toast({
        title: "Payment Successful",
        description: "Your payment has been confirmed. You can now secure your NFT.",
      });
    } else {
      router.push("/error?reason=payment_failed");
    }
    setIsPaying(false);
  }

  async function handleTranslateContract() {
    if (!selectedLanguage || selectedLanguage === 'en') {
      setTranslatedContract(deliveryContract);
      return;
    }

    setIsTranslating(true);
    try {
      const languageLabel = languages.find(l => l.value === selectedLanguage)?.label || 'English';
      const result = await translateText({ text: deliveryContract, targetLanguage: languageLabel });
      setTranslatedContract(result.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedContract("Sorry, translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isPaid) {
      toast({
        variant: "destructive",
        title: "Payment Required",
        description: "You must complete the payment before submitting the form.",
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
          title: "Incomplete Form",
          description: `Please fill out the following required fields: ${aiVerificationResult.missingFields.join(", ")}`,
        });
        return;
      }

      const result = await submitForm(values);
      if (result.success) {
        setIsSubmitted(true);
      } else {
        toast({
          variant: "destructive",
          title: "Submission Failed",
          description: result.error || "An unknown error occurred. Please try again.",
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
            <h2 className="text-3xl font-bold">Thank You!</h2>
            <p className="text-muted-foreground">
              Your NFT delivery request has been submitted. You will receive a confirmation email shortly.
            </p>
          </div>
          <Button onClick={() => window.location.reload()}>Submit another form</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl" id="delivery-form">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Complete Your Delivery</CardTitle>
        <CardDescription className="text-center">
        Follow the steps below to securely receive your NFT.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
             <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                         <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {lang.label}
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
              name="buyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
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
                  <FormLabel>Email Address</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} className="pl-10" />
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
                  <FormLabel>Select NFT</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="Choose your purchased NFT" />
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
                              className="rounded-md object-cover"
                              data-ai-hint={nft.dataAiHint}
                            />
                            <div>
                              <p className="font-semibold">{nft.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Price: {nft.price}
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
                  <FormLabel>Download Password</FormLabel>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <FormControl>
                      <Input type="password" placeholder="Create a secure password" {...field} className="pl-10" />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Dialog onOpenChange={(open) => open && handleTranslateContract()}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  View Delivery Contract
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>NFT Delivery Contract</DialogTitle>
                  <DialogDescription>
                  Please read the terms carefully before proceeding.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-96 w-full rounded-md border p-4 text-sm whitespace-pre-wrap">
                  {isTranslating ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    translatedContract || deliveryContract
                  )}
                </ScrollArea>
                 <DialogClose asChild>
                    <Button type="button">Close</Button>
                  </DialogClose>
              </DialogContent>
            </Dialog>

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
                      I have read and agree to the terms of the delivery contract.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
             {termsAgreed && !isPaid && (
              <div className="w-full text-center space-y-2">
                <div className="text-sm text-muted-foreground">
                  <p>For alternative payment, send to PayPal:</p>
                  <p className="font-semibold">piluka1977@gmail.com</p>
                </div>
                 <Button
                  type="button"
                  onClick={handlePayment}
                  disabled={isPaying}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  {isPaying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  <Wallet className="mr-2 h-4 w-4" />
                  {isPaying ? "Processing Payment..." : "Pay with Wallet"}
                </Button>
              </div>
            )}
            <Button
              type="submit"
              disabled={isPending || !isPaid}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-transform hover:scale-105"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPending ? "Submitting..." : "Secure my NFT"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
