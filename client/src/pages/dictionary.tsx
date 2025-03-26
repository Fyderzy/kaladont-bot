import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Definisanje tipova za API
interface SingleWordResponse {
  success: boolean;
  message: string;
}

interface MultiWordResponse {
  success: boolean;
  message: string;
  added: number;
}

interface DictionaryStats {
  wordCount: number;
  avgLength: number;
  letterCounts: Record<string, number>;
}

// Šema za dodavanje jedne reči
const singleWordSchema = z.object({
  word: z
    .string()
    .min(2, "Reč mora imati bar 2 slova")
    .max(50, "Reč ne može biti duža od 50 slova")
    .regex(/^[a-zčćđšžA-ZČĆĐŠŽ]+$/, "Reč može sadržati samo slova srpskog jezika"),
});

// Šema za dodavanje više reči
const multiWordSchema = z.object({
  words: z
    .string()
    .min(2, "Tekst mora imati bar 2 karaktera")
});

type SingleWordFormValues = z.infer<typeof singleWordSchema>;
type MultiWordFormValues = z.infer<typeof multiWordSchema>;

export default function Dictionary() {
  const [activeTab, setActiveTab] = useState("single");

  // Forme
  const singleWordForm = useForm<SingleWordFormValues>({
    resolver: zodResolver(singleWordSchema),
    defaultValues: {
      word: "",
    },
  });

  const multiWordForm = useForm<MultiWordFormValues>({
    resolver: zodResolver(multiWordSchema),
    defaultValues: {
      words: "",
    },
  });

  // Query za statistiku rečnika
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/dictionary/stats"],
    queryFn: () => apiRequest<DictionaryStats>("/api/dictionary/stats"),
  });

  // Mutacija za dodavanje jedne reči
  const addWordMutation = useMutation({
    mutationFn: (data: SingleWordFormValues) => 
      apiRequest<SingleWordResponse>("/api/dictionary/add-word", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Uspeh!",
          description: data.message,
        });
        // Resetuj formu
        singleWordForm.reset();
        // Osveži statistiku
        queryClient.invalidateQueries({ queryKey: ["/api/dictionary/stats"] });
      } else {
        toast({
          title: "Greška",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom dodavanja reči.",
        variant: "destructive",
      });
    },
  });

  // Mutacija za dodavanje više reči
  const addWordsMutation = useMutation({
    mutationFn: (formData: MultiWordFormValues) => {
      // Razdvajamo reči po linijama, uklanjamo prazne
      const wordsList = formData.words
        .split(/[\n,;]/)
        .map(word => word.trim())
        .filter(word => word.length > 0);
      
      return apiRequest<MultiWordResponse>("/api/dictionary/add-words", {
          method: "POST",
          body: JSON.stringify({ words: wordsList }),
        });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Uspeh!",
          description: data.message,
        });
        // Resetuj formu
        multiWordForm.reset();
        // Osveži statistiku
        queryClient.invalidateQueries({ queryKey: ["/api/dictionary/stats"] });
      } else {
        toast({
          title: "Greška",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Greška",
        description: "Došlo je do greške prilikom dodavanja reči.",
        variant: "destructive",
      });
    },
  });

  // Handleri za forme
  const onSingleWordSubmit = (data: SingleWordFormValues) => {
    addWordMutation.mutate(data);
  };

  const onMultiWordSubmit = (data: MultiWordFormValues) => {
    addWordsMutation.mutate(data);
  };

  // Render
  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Upravljanje Rečnikom</h1>
      
      {/* Statistika */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Statistika Rečnika</CardTitle>
          <CardDescription>Trenutno stanje srpskog rečnika za Kaladont igru</CardDescription>
        </CardHeader>
        <CardContent>
          {statsLoading ? (
            <p>Učitavanje statistike...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Ukupno reči</h3>
                <p className="text-3xl font-bold">{statsData?.wordCount || 0}</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Prosečna dužina</h3>
                <p className="text-3xl font-bold">{statsData?.avgLength ? statsData.avgLength.toFixed(1) : 0}</p>
              </div>
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Najčešća slova</h3>
                <div className="flex flex-wrap gap-2">
                  {statsData?.letterCounts && 
                    Object.entries(statsData.letterCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([letter, count]) => (
                        <Badge key={letter} variant="outline" className="text-sm">
                          {letter}: {count}
                        </Badge>
                      ))
                  }
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Forme za dodavanje reči */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="single">Dodaj jednu reč</TabsTrigger>
          <TabsTrigger value="multi">Dodaj više reči</TabsTrigger>
        </TabsList>
        
        {/* Jedna reč */}
        <TabsContent value="single">
          <Card>
            <CardHeader>
              <CardTitle>Dodaj novu reč</CardTitle>
              <CardDescription>
                Dodajte pojedinačnu srpsku reč u rečnik za Kaladont igru
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...singleWordForm}>
                <form onSubmit={singleWordForm.handleSubmit(onSingleWordSubmit)} className="space-y-4">
                  <FormField
                    control={singleWordForm.control}
                    name="word"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reč</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite reč" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={addWordMutation.isPending}
                    className="w-full"
                  >
                    {addWordMutation.isPending ? "Dodajem..." : "Dodaj reč"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Više reči */}
        <TabsContent value="multi">
          <Card>
            <CardHeader>
              <CardTitle>Dodaj više reči odjednom</CardTitle>
              <CardDescription>
                Unesite više srpskih reči odjednom, razdvojenih novim redom, zarezom ili tačka-zarezom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...multiWordForm}>
                <form onSubmit={multiWordForm.handleSubmit(onMultiWordSubmit)} className="space-y-4">
                  <FormField
                    control={multiWordForm.control}
                    name="words"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reči</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Unesite reči (po jedna u redu, ili razdvojene zarezom)" 
                            className="min-h-[200px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={addWordsMutation.isPending}
                    className="w-full"
                  >
                    {addWordsMutation.isPending ? "Dodajem..." : "Dodaj reči"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}