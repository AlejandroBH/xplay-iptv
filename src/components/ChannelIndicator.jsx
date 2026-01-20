/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styled from "styled-components";

const IndicatorContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  z-index: 1000;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? 0 : -20)}px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media screen and (width < 720px) {
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const ChannelNumber = styled.span`
  color: #4a9eff;
  background: transparent;
  margin-right: 8px;
`;

const ChannelIndicator = ({ currentChannel, totalChannels, channelName, show }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, currentChannel]);

    return (
        <IndicatorContainer $visible={visible}>
            <ChannelNumber>
                {currentChannel + 1} / {totalChannels}
            </ChannelNumber>
            {channelName}
        </IndicatorContainer>
    );
};

export default ChannelIndicator;
