"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeDialog } from "./code-dialog";

const codeString = `
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InteractiveElements = () => (
  <>
    <div className="flex flex-wrap gap-4">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border rounded-b-md">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="p-4 border rounded-b-md">
        Change your password here.
      </TabsContent>
    </Tabs>
  </>
);
`;

export const InteractiveElementsCard = () => {
  return (
    <Card className="col-span-1 md:col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Interactive Elements</CardTitle>
        <CardDescription>Components for user actions and navigation.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-grow">
        <div className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="p-4 border rounded-b-md">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password" className="p-4 border rounded-b-md">
            Change your password here.
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <CodeDialog codeString={codeString} title="Interactive Elements" />
      </CardFooter>
    </Card>
  );
};