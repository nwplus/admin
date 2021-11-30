import styled, { css } from "styled-components";

const SetBackground = css`
  ${(p) => p.background && `background: ${p.background}`};
`;

const SetColor = css`
  ${(p) => p.color && `color: ${p.color}`};
`;

export const Title1 = styled.h1.attrs((p) => ({
  color: p.color || p.theme.colors.secondary,
}))`
  margin: 0;
  font-style: normal;
  font-weight: 800;
  font-size: 42.63px;
  letter-spacing: 0.38px;
  line-height: 53.46px;
  ${SetColor}
  ${SetBackground}
  ${(p) =>
    p.withGradient &&
    `background: -webkit-linear-gradient(92deg, #19cbcb 1.55%, #78ff96 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;`}
  ${(p) => p.theme.mediaQueries.mobile} {
    font-size: 21.32px;
    line-height: 27.77px;
  }
  ${(p) => p.underline && "text-decoration: underline;"}
  ${(p) =>
    p.hover &&
    `&:hover {
      cursor: pointer;
      color: ${p.theme.colors.primary}
    }`}
  ${(p) => (p.align ? `text-align: ${p.align}` : "")};
`;

export const Title2 = styled.h2.attrs((p) => ({
  color: p.color || p.theme.colors.secondary,
}))`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.26px;
  font-feature-settings: "liga" off;
  ${SetColor}
  ${SetBackground}
  ${(p) =>
    p.withGradient &&
    `background: -webkit-linear-gradient(92.58deg, #20FFAF 0%, #78FF96 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;`}
  ${(p) => p.theme.mediaQueries.mobile} {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const Title3 = styled.h3.attrs((p) => ({
  color: p.color || p.theme.colors.secondary,
}))`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.45px;
  font-feature-settings: "liga" off;
  ${SetColor}
  ${SetBackground}
  ${(p) =>
    p.withGradient &&
    `background: -webkit-linear-gradient(92.58deg, #20FFAF 0%, #78FF96 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;`}
  ${(p) => p.theme.mediaQueries.mobile} {
    font-size: 12px;
    line-height: 16px;
  }
  ${(p) => p.customStyles}
`;

export const Title3 = styled.h4.attrs((p) => ({
  color: p.color || p.theme.colors.secondary,
}))`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.45px;
  font-feature-settings: "liga" off;
  ${SetColor}
  ${SetBackground}
  ${(p) =>
    p.withGradient &&
    `background: -webkit-linear-gradient(92.58deg, #20FFAF 0%, #78FF96 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;`}
  ${(p) => p.theme.mediaQueries.mobile} {
    font-size: 12px;
    line-height: 16px;
  }
  ${(p) => p.customStyles}
`;
