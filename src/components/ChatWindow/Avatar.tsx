import styled from "styled-components";

export function Avatar() {
  return <Image src="@/assets/avatar.jpg" alt="avatar" />;
}

const Image = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;
