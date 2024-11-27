"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClientAdmin } from "./supabase/admin";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일은 필수 입력 항목입니다." })
    .email({ message: "유효한 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(1, { message: "비밀번호는 필수 입력 항목입니다." })
    .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." }),
});

const ConfirmPasswordSchema = z.object({
  password: z
  .string()
  .min(1, { message: "비밀번호는 필수 입력 항목입니다." })
  .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." }),
  confirmPassword: z
  .string()
  .min(1, { message: "비밀번호는 필수 입력 항목입니다." })
  .min(8, { message: "비밀번호는 최소 8자리 이상이어야 합니다." }),
});

const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "닉네임은 필수 입력 항목입니다." })
    .max(15, { message: "닉네임은 15자 이하로 입력해주세요." }),
});

export async function login(formData: FormData) {
  const supabase = await createClient();
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "유효하지 않은 입력 값입니다.",
    };
  }
  const { email, password } = validatedFields.data;
  const { data:userData, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  const userId = userData?.user?.id;

  if (userId) {
    console.log('userId:', userId);
    const { data: existingMember } = await supabase
      .from('members')
      .select()
      .eq('user_id', userId);

    if (!existingMember || existingMember.length === 0) {
      const { error: insertError } = await supabase
        .from('members')
        .insert([{ user_id: userId, nickname:'Guest'}]);

      if (insertError) {
        console.error('멤버 테이블에 정보 저장 실패:', insertError);
        return {
          message: '회원 정보 저장 중 문제가 발생했습니다. 다시 시도해주세요.',
          status: 'insert_error',
        };
      }
    }
  }

  if (error) {
    const errorMessage =
      error.status === 400
        ? "잘못된 이메일 또는 비밀번호입니다."
        : "로그인 처리 중 문제가 발생했습니다. 나중에 다시 시도해주세요.";

    return {
      message: errorMessage,
      status: "auth_error",
    };
  }
  redirect("/projects");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "유효하지 않은 입력 값입니다.",
    };
  }
  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    return {
      message: "회원가입 중 문제가 발생했습니다. 다시 시도해주세요.",
      status: "signup_error",
    };
  }

  redirect("/login");
}

export async function signout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function updateUserInfo(formData: FormData) {
  const supabase = await createClient();
  const {data:userData} = await supabase.auth.getUser();
  if (!userData) {
    redirect("/login");
  }
  const validatedFields = ConfirmPasswordSchema.safeParse({
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "유효하지 않은 입력 값입니다.",
    };
  }
  const { password, confirmPassword } = validatedFields.data;

  if (password !== confirmPassword) {
    return {
      message: "비밀번호와 비밀번호 확인 값이 일치하지 않습니다.",
      status: "validation_error",
    };
  }
  
  const { error } = await supabase.auth.updateUser({password: password});

  if (error) {
    return {
      message: "비밀번호 변경 중 문제가 발생했습니다. 다시 시도해주세요.",
      status: "update_error",
    };
  }

  redirect("/login");
}


export async function withdraw() {
  const supabase = await createClientAdmin();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if(userId){
    console.log('userId:',userId);
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.log('error:',error);
      redirect("/error");
    }
  }
  revalidatePath("/");
  redirect("/");
}

export async function updateNickname(formData: FormData) {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  const validatedFields = nicknameSchema.safeParse({
    nickname: formData.get("nickname") as string,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "유효하지 않은 입력 값입니다.",
    };
  }
  const { nickname } = validatedFields.data;
  const { error } = await supabase
    .from("members")
    .update({ nickname: nickname })
    .eq("user_id", userId);

  if (error) {
    return {
      message: "닉네임 변경 중 문제가 발생했습니다. 다시 시도해주세요.",
      status: "update_error",
    };
  }

  redirect("/");
}
