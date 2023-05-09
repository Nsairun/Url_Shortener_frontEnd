import styled from 'styled-components';

const StyledUrlStats = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 5px;

  .urlInfo {
    .clicks {
      text-align: right;
      color: #ff621f;
    }

    margin: 10px auto;
    width: 97vw;
    max-width: 1500px;

    table {
      background-color: #1b1c2d70;
      width: 100%;
      margin: 20px 0 0;

      th {
        word-break: keep-all;
        text-align: center;
        padding: 15px 5px;
        color: #ff621f;
      }

      td {
        color: #f5f5f5;
        border: 1px solid #ff621f;
        word-break: break-all;
        text-align: center;
        text-overflow: ellipsis;
        min-width: 70%;
        max-width: 300px;
        padding: 10px 5px;
      }
    }
  }
`;

export default StyledUrlStats;
