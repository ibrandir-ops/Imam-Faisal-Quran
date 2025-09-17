'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/components/theme-provider";

export default function SettingsPage() {
    const { resolvedTheme, setTheme } = useTheme();
    // In a real app, font size would be managed in a global state (e.g., Context or Zustand)
    // and applied to the body tag. Here we just show the control.
    const [fontSize, setFontSize] = useState([16]);

    return (
        <div className="space-y-8 pb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-headline font-bold">Settings</h1>
            
            <Card>
                <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>Customize the look and feel of the app.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode" className="flex flex-col gap-1">
                          <span>Dark Mode</span>
                          <span className="font-normal leading-snug text-muted-foreground">
                            Toggle between light and dark themes.
                          </span>
                        </Label>
                        <Switch
                            id="dark-mode"
                            checked={resolvedTheme === 'dark'}
                            onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size ({fontSize[0]}px)</Label>
                        <Slider
                            id="font-size"
                            min={12}
                            max={24}
                            step={1}
                            value={fontSize}
                            onValueChange={setFontSize}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Choose your preferred translations and reciters.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="translation">Default Translation</Label>
                        <Select defaultValue="en">
                            <SelectTrigger id="translation">
                                <SelectValue placeholder="Select a translation" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="reciter">Default Reciter</Label>
                        <Select defaultValue="mishary">
                            <SelectTrigger id="reciter">
                                <SelectValue placeholder="Select a reciter" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mishary">Mishary Alafasy</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage your notification settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label htmlFor="verse-of-day">Verse of the Day</Label>
                            <p className="text-sm text-muted-foreground">Receive a daily verse to inspire you.</p>
                        </div>
                        <Switch id="verse-of-day" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label htmlFor="reading-reminders">Reading Reminders</Label>
                            <p className="text-sm text-muted-foreground">Get reminders to continue your reading.</p>
                        </div>
                        <Switch id="reading-reminders" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
