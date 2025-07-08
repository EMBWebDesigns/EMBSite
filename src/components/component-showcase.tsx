"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

export const ComponentShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Various button styles for any action.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Alert</CardTitle>
          <CardDescription>For important messages and notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components to your app using the cli.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Input</CardTitle>
          <CardDescription>A standard input field for forms.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input type="email" placeholder="Email" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Switch</CardTitle>
          <CardDescription>A toggle switch for boolean options.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center space-x-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </CardContent>
      </Card>
    </div>
  );
};