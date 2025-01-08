'use server'

import { revalidatePath } from 'next/cache'

export async function uploadResume(formData: FormData) {
  const file = formData.get('resume') as File
  
  if (!file) {
    return { success: false, message: 'ファイルが選択されていません。' }
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, message: 'ファイルサイズは5MB以下にしてください。' }
  }

  if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
    return { success: false, message: 'PDFまたはWord文書のみアップロード可能です。' }
  }

  try {
    // ここでファイルの保存処理を行います
    // 例: await saveFileToStorage(file)
    console.log('ファイルアップロード:', file.name)

    revalidatePath('/resume-upload')
    return { success: true, message: 'レジュメが正常にアップロードされました。' }
  } catch (error) {
    console.error('アップロードエラー:', error)
    return { success: false, message: 'アップロード中にエラーが発生しました。もう一度お試しください。' }
  }
}

