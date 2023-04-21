import { SupabaseClient } from '@supabase/supabase-js'

export async function uploadUserImage(
  supabase: SupabaseClient,
  userId: string | undefined,
  file: File,
  bucket: string,
  profileColumn: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const newName = Date.now() + file.name
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(newName, file)

    if (error) throw error
    if (data) {
      const url =
        process.env.NEXT_PUBLIC_SUPABASE_URL +
        `/storage/v1/object/public/${bucket}/` +
        data.path
      supabase
        .from('profiles')
        .update({
          [profileColumn]: url,
        })
        .eq('id', userId)
        .then((result) => {
          if (!result.error) {
            resolve()
          } else {
            throw result.error
          }
        })
    }
  })
}
