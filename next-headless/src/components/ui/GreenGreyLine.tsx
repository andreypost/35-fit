import styled from "styled-components";

const Div = styled.div`
  height: 14px;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 6px;
  background-color: #e8e8e8;
  @keyframes greeLineWidth {
    0% {
      width: 0%;
    }
    100% {
      width: var(--sales-width);
    }
  }
  .green_line {
    height: 14px;
    border-radius: 6px;
    background-color: #59b894;
    animation: greeLineWidth 2s infinite alternate;
    // animation: greeLineWidth 2s;
  }
`;

export const GreenGreyLine = ({ sales }: { sales: number }) => {
  return (
    <Div className="green_grey_line">
      <div
        className="green_line"
        style={{ "--sales-width": `${sales}%` } as React.CSSProperties}
      />
    </Div>
  );
};
