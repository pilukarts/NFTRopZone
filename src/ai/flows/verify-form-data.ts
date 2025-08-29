'use server';

/**
 * @fileOverview A flow to verify that the form data is complete.
 *
 * - verifyFormData - A function that verifies form data for completeness.
 * - VerifyFormDataInput - The input type for the verifyFormData function.
 * - VerifyFormDataOutput - The return type for the verifyFormData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyFormDataInputSchema = z.object({
  buyerName: z.string().describe('The name of the buyer.'),
  buyerEmail: z.string().email().describe('The email of the buyer.'),
  selectedNft: z
    .string()
    .describe('The selected NFT (name, url, and price).'),
  termsAgreement: z
    .boolean()
    .describe('Whether the buyer agrees to the delivery contract.'),
});
export type VerifyFormDataInput = z.infer<typeof VerifyFormDataInputSchema>;

const VerifyFormDataOutputSchema = z.object({
  isComplete: z.boolean().describe('Whether the form data is complete.'),
  missingFields: z
    .array(z.string())
    .describe('List of missing fields, if any.'),
});
export type VerifyFormDataOutput = z.infer<typeof VerifyFormDataOutputSchema>;

export async function verifyFormData(input: VerifyFormDataInput): Promise<VerifyFormDataOutput> {
  return verifyFormDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'verifyFormDataPrompt',
  input: {schema: VerifyFormDataInputSchema},
  output: {schema: VerifyFormDataOutputSchema},
  prompt: `You are a form data validator.

Determine if the following form data is complete.

Buyer Name: {{{buyerName}}}
Buyer Email: {{{buyerEmail}}}
Selected NFT: {{{selectedNft}}}
Terms Agreement: {{{termsAgreement}}}

If any fields are missing, identify them.

Return a JSON object with the isComplete field set to true or false, and the missingFields field containing an array of missing field names (if any).`,
});

const verifyFormDataFlow = ai.defineFlow(
  {
    name: 'verifyFormDataFlow',
    inputSchema: VerifyFormDataInputSchema,
    outputSchema: VerifyFormDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
