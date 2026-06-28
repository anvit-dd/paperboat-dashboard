"use client";

import * as React from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/dashboard/page-header";

const toggles = [
  {
    id: "deploy-alerts",
    title: "Deployment alerts",
    desc: "Notify me when a deployment fails or rolls back.",
    default: true,
  },
  {
    id: "usage-alerts",
    title: "Usage thresholds",
    desc: "Email me when spend reaches 80% of my cap.",
    default: true,
  },
  {
    id: "weekly-digest",
    title: "Weekly digest",
    desc: "A Monday summary of fleet health and usage.",
    default: false,
  },
];

export default function SettingsPage() {
  const [saving, setSaving] = React.useState(false);

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved", {
        description: "Your workspace preferences have been updated.",
      });
    }, 600);
  }

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Manage your profile, workspace, and notification preferences."
      />

      <form onSubmit={onSave} className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base font-semibold">Profile</CardTitle>
            <CardDescription>How you appear across the workspace.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" defaultValue="Anvit" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" defaultValue="Dadape" />
            </div>
            <div className="grid gap-1.5 sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="dinesh.dadape@gmail.com" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base font-semibold">Workspace</CardTitle>
            <CardDescription>Defaults applied to new agents and tunnels.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-1.5">
              <Label htmlFor="workspace">Workspace name</Label>
              <Input id="workspace" defaultValue="Paperboat Labs" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="region">Default region</Label>
              <Input id="region" defaultValue="us-east" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-base font-semibold">
              Notifications
            </CardTitle>
            <CardDescription>Choose what Paperboat emails you about.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {toggles.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch defaultChecked={t.default} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline">Cancel</Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </>
  );
}
