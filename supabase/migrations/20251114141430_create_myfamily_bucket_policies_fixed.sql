/*
  # Create storage policies for myfamily bucket
  
  1. Policies
    - Allow authenticated users to upload files
    - Allow authenticated users to read their own files
    - Allow authenticated users to delete their own files
    - Allow public read access to all files (for sharing)
    
  2. Security
    - Users can only manage files they uploaded
    - Public can view files but not modify them
*/

-- Create policy for inserting files (upload)
CREATE POLICY "Authenticated users can upload files"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'myfamily'
);

-- Create policy for selecting files (download/view)
CREATE POLICY "Anyone can view files in myfamily bucket"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'myfamily'
);

-- Create policy for updating files
CREATE POLICY "Users can update their own files"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'myfamily' AND auth.uid() = owner::uuid
)
WITH CHECK (
  bucket_id = 'myfamily' AND auth.uid() = owner::uuid
);

-- Create policy for deleting files
CREATE POLICY "Users can delete their own files"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'myfamily' AND auth.uid() = owner::uuid
);
