import React from 'react';
import styled, { keyframes } from 'styled-components';

const QueueContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(20px);
  }
`;

const QueueRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 10px;
`;

const QueueItem = styled.div<{ isAdding: boolean; isRemoving: boolean }>`
  background-color: white;
  border: 1px solid #ccc;
  padding: 2em;
  margin: 5px;
  text-align: center;
  border-radius: 4px;
  position: relative;
  animation: ${({ isAdding, isRemoving }) => 
    isAdding ? fadeIn : isRemoving ? fadeOut : 'none'} 0.3s ease forwards;
`;

const TopLine = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: #ddd;
  position: absolute;
  top: -10px;
`;

const BottomLine = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 1px;
  background-color: #ddd;
  position: absolute;
  bottom: -10px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 10px 10px 10px; /* 화살표가 아래쪽을 가리키게 설정 */
  border-color: transparent transparent #000 transparent;
  margin-bottom: 10px;
  position: absolute;
  top: -30px;
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  top: -50px;
`;

interface QueueCanvasProps {
  queue: string[];
  queueSize: number;
}

const QueueCanvas: React.FC<{ queue: string[]; queueSize: number; isAdding: boolean; isRemoving: boolean }> = ({ queue, queueSize, isAdding, isRemoving }) => {
  const queueWidth = queueSize > 0 ? `${queueSize * 167}px` : '0';

  return (
    <QueueContainer>
      <TopLine width={queueWidth} />
      <QueueRow>
        {queue.length === 0 ? (
          <p>큐가 비어 있습니다.</p>
        ) : (
          queue.map((item, index) => (
            <QueueItem key={index}  isAdding={isAdding && index === 0} isRemoving={isRemoving && index === queue.length - 1}>
              {item}
              {index === 0 && (
                <>
                  <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
                  <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    Rear
                  </Label>
                </>
              )}
              {index === queue.length - 1 && (
                <>
                  <Arrow style={{ left: '50%', transform: 'translateX(-50%)' }} />
                  <Label style={{ left: '50%', transform: 'translateX(-50%)' }}>
                    Front
                  </Label>
                </>
              )}
            </QueueItem>
          ))
        )}
      </QueueRow>
      <BottomLine width={queueWidth} />
    </QueueContainer>
  );
};

export default QueueCanvas;
