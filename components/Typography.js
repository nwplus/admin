import styled, { css } from 'styled-components';

const SetBackground = css`
  ${(p) => p.background && `background: ${p.background}`};
`;

const SetColor = css`
  ${(p) => p.color && `color: ${p.color}`};
`;

export const Title1 = styled.h1.attrs((p) => ({
  color: p.color || '#fff',
}))`
  margin: 0;
  font-style: normal;
  font-weight: 900;
  font-size: 56px;
  letter-spacing: 0.4px;
  line-height: 56px;
  ${SetColor}
  ${SetBackground}
  ${(p) => p.underline && 'text-decoration: underline;'}
  ${(p) =>
    p.hover &&
    `&:hover {
      cursor: pointer;
    }`}
  ${(p) => (p.align ? `text-align: ${p.align}` : '')};
`;

export const Title2 = styled.h2.attrs((p) => ({
  color: p.color || '#fff',
}))`
  font-style: normal;
  font-weight: 800;
  font-size: 42px;
  line-height: 34px;
  letter-spacing: 0.38px;
  font-feature-settings: 'liga' off;
  ${SetColor}
  ${SetBackground}
`;

export const Title3 = styled.h3.attrs((p) => ({
  color: p.color || '#fff',
}))`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 28px;
  letter-spacing: -0.26px;
  font-feature-settings: 'liga' off;
  ${SetColor}
  ${SetBackground}
`;

export const Title4 = styled.h4.attrs((p) => ({
  color: p.color || '#fff',
}))`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 25px;
  letter-spacing: -0.45px;
  font-feature-settings: 'liga' off;
  ${SetColor}
  ${SetBackground}
`;

export const Title5 = styled.h5.attrs((p) => ({
  color: p.color || '#fff',
}))`
  margin: 1.5rem 0 1rem 0;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: -0.45px;
  font-feature-settings: 'liga' off;
  ${SetColor}
  ${SetBackground}
`;
