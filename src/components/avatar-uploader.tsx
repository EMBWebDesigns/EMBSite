"use client";

import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface AvatarUploaderProps {
  uid: string;
  url: string | null | undefined;
  onUpload: (url: string) => void;
}

export function AvatarUploader({ uid, url, onUpload }: AvatarUploaderProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null | undefined>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setAvatarUrl(url);
  }, [url]);

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      
      onUpload(publicUrl);
      setAvatarUrl(publicUrl);
      toast.success("Avatar updated! Click 'Save Changes' to apply.");

    } catch (error: any) {
      toast.error("Failed to upload avatar.", { description: error.message });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={avatarUrl || ''} alt="User avatar" />
        <AvatarFallback>
          <Upload className="h-8 w-8 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <Button asChild variant="outline">
        <label htmlFor="avatar-upload">
          {uploading ? "Uploading..." : "Upload New Picture"}
        </label>
      </Button>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}