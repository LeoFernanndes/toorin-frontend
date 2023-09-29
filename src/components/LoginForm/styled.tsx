import styled from "styled-components";

const screenSizes = {
    "small": "576px",
    "medium": "768px",
    "large": "992px",
    "xlarge": "1200px",
    "xxlarge": "1400px"
}



export const InnerLoginFormContainer = styled.div`
  @media screen and (max-width: ${screenSizes.small}){
    margin: 0 auto;
    width: 90%;
    padding: 10% 0;
  }
  @media screen and (min-width: ${screenSizes.small}){
    margin: 0 auto;
    width: 80%;
    padding: 10% 0;
  }
  @media screen and (min-width: ${screenSizes.medium}){
    margin: 0 auto;
    width: 50%;
    padding: 10% 0;
  }
  @media screen and (min-width: ${screenSizes.large}){
    margin: 0 auto;
    width: 40%;
    padding: 10% 0;
  }
  @media screen and (min-width: ${screenSizes.xlarge}){
    margin: 0 auto;
    width: 30%;
    padding: 10% 0;
  }
  @media screen and (min-width: ${screenSizes.xxlarge}){
    margin: 0 auto;
    width: 25%;
    padding: 10% 0;
  }
`

export const LoginFormButtonsContainer = styled.div`
    @media screen and (max-width: ${screenSizes.small}){
      width: 80%;
      margin: auto;
  }
  @media screen and (min-width: ${screenSizes.small}){
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: auto;
  }
  @media screen and (min-width: ${screenSizes.medium}){
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
  }
  @media screen and (min-width: ${screenSizes.large}){
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: auto;
  }
  @media screen and (min-width: ${screenSizes.xlarge}){
    display: flex;
    justify-content: space-between;
    width: 85%;
    margin: auto;
  }
  @media screen and (min-width: ${screenSizes.xxlarge}){
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: auto;
  }
`


export const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1% 0 1% 0;
`