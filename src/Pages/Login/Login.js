import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { BASE_URL } from "../../config";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("회원가입");
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const submitUserInfo = async (e) => {
    e.preventDefault();

    const request = mode === "회원가입" ? "signup" : "signin";
    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/${request}`,
        userInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data) {
        localStorage.setItem("token", data.access_token);

        mode === "회원가입"
          ? alert("회원가입에 성공하셨습니다.")
          : alert("로그인이 되었습니다.");

        navigate("/todo");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserInfo = (e) => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
  };

  const checkValidity = () => {
    const { email, password } = userInfo;

    if (!email.includes("@") || password.length < 8) return false;

    return true;
  };

  return (
    <Wrapper>
      <FormContainer>
        <ButtonBox>
          <SignUpButton mode={mode} onClick={() => setMode("회원가입")}>
            회원가입
          </SignUpButton>
          <SignInButton mode={mode} onClick={() => setMode("로그인")}>
            로그인
          </SignInButton>
        </ButtonBox>
        <LoginForm>
          <FormItem>
            <Label>이메일</Label>
            <Input
              name="email"
              placeholder="이메일을 입력해주세요."
              onKeyUp={handleUserInfo}
            ></Input>
          </FormItem>
          <FormItem>
            <Label>비밀번호</Label>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleUserInfo}
            ></Input>
          </FormItem>
          <SubmitBtn disabled={!checkValidity()} onClick={submitUserInfo}>
            {mode}
          </SubmitBtn>
        </LoginForm>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()};
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 60px 10px;
  width: 480px;
  background: #eef1f9;
  transform: translate(-50%, -50%);
  border-radius: 10px;
`;

const LoginForm = styled.form`
  padding: 10px;
`;

const Label = styled.label`
  padding-left: 5px;
`;

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #eeeeee;
  width: 100%;
`;

const FormItem = styled.div`
  padding: 10px 0;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const SignUpButton = styled.button`
  padding: 10px;
  width: 70px;
  border: 1px solid transparent;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: ${({ theme, mode }) =>
    mode === "회원가입" ? theme.fontMain : "white"};
  color: ${({ theme, mode }) =>
    mode === "회원가입" ? theme.fontSub : "black"};
  cursor: pointer;
`;

const SignInButton = styled.button`
  padding: 10px;
  width: 70px;
  border: 1px solid #eeeeee;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background: ${({ theme, mode }) =>
    mode === "로그인" ? theme.fontMain : "white"};
  color: ${({ theme, mode }) => (mode === "로그인" ? theme.fontSub : "black")};
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  width: 70px;
  background: ${({ theme }) => theme.fontMain};
  color: ${({ theme }) => theme.fontSub};
  border: 0;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background: #dbdbdb;
    cursor: not-allowed;
  }
`;
