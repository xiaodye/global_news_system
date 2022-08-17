import styled from "styled-components"

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  font-size: 20px;
  color: #fff;
`
// 表单容器
const FormContainer = styled.div`
  box-sizing: border-box;
  width: 400px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 10px;
`

const AppName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 80px; */
  font-size: 28px;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(120deg, #a6c0fe 0%, #f68084 100%);
  font-weight: bold;
  margin: 20px 0 30px;
`
export { LoginContainer, FormContainer, AppName }
