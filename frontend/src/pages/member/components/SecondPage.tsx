import { TargetIcon } from '@/assets/icons';
import { Button, Input, BottomSheet } from '@/components';
import theme from '@/styles/theme';
import { pageProps } from '@/types/type';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.5rem;
  display: flex:
  flex-direction: column;
`;

const SecondPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 0.4rem;
`;

const Column = styled.div<{ $color: keyof typeof theme }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: ${props => theme[props.$color]};
`;

const Box = styled.div`
  background-color: ${props => props.theme.lightgrey};
  border-radius: 0.63rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const ModalContent = styled.div<{ $margin?: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 0.5rem;
  border-radius: 0.63rem;
  margin-bottom: ${props => (props?.$margin ? '3.25rem' : '0')};
`;

const Target = styled.div`
  margin-top: 3rem;
  text-align: right;
  color: ${props => props.theme.grey};
`;

const Period = styled.span`
  color: ${props => props.theme.black};
  font-size: 1.4rem;
`;

const SmallButton = styled.button`
  background-color: ${props => props.theme.lightgreen};
  color: ${props => props.theme.darkgreen};
  border-radius: 1rem;
  width: 5.2rem;
  height: 2.2rem;
  font-size: 1.15rem;
`;

const SecondPage = (pageProps: pageProps) => {
  const { data, setData, next, onClick, nowWeight, targetWeight } = pageProps;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(data.targetCalories);

  const [period, setPeriod] = useState<number>(0);

  const [BMR, setBMR] = useState<number>(0);
  const [TDEE, setTDEE] = useState<number>(0);

  const calculateTargetCalories = () => {
    let valueBMR;
    if (data.gender === '남성') {
      valueBMR = 10 * data.nowWeight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      valueBMR = 10 * data.nowWeight + 6.25 * data.height - 5 * data.age - 161;
    }
    setBMR(Math.round(valueBMR));

    let valueTDEE;
    if (data.gender === '남성') {
      switch (data.activeLevel) {
        case '거의없음':
          valueTDEE = valueBMR * 1.0;
          break;
        case '적음':
          valueTDEE = valueBMR * 1.11;
          break;
        case '보통':
          valueTDEE = valueBMR * 1.25;
          break;
        case '많음':
          valueTDEE = valueBMR * 1.48;
          break;
        case '매우많음':
        default:
          valueTDEE = valueBMR * 1.8;
          break;
      }
    } else {
      switch (data.activeLevel) {
        case '거의없음':
          valueTDEE = valueBMR * 1.0;
          break;
        case '적음':
          valueTDEE = valueBMR * 1.12;
          break;
        case '보통':
          valueTDEE = valueBMR * 1.27;
          break;
        case '많음':
          valueTDEE = valueBMR * 1.45;
          break;
        case '매우많음':
        default:
          valueTDEE = valueBMR * 1.78;
          break;
      }
    }
    setTDEE(Math.round(valueTDEE));

    // 시작 체중과 목표 체중이 수정되면 재계산
    if (data.nowWeight !== nowWeight || data.targetWeight !== targetWeight) {
      // 목표 칼로리가 0이하인 값은 message 출력
      if (Math.round(valueTDEE - 500) <= 0) {
        setData(prev => ({
          ...prev,
          targetCalories: 0,
        }));
        return;
      }

      setData(prevData => ({
        ...prevData,
        // 목표 칼로리를 500kcal 적자로 설정
        targetCalories: Math.round(valueTDEE - 500),
      }));

      setInputValue(Math.round(valueTDEE - 500));
    }
  };

  const calculatePeriods = (targetCalories: number) => {
    let gap = Math.round((data.nowWeight - data.targetWeight) * 10) / 10;

    if (Math.round((gap / ((TDEE - targetCalories) / 1000)) * 10) / 10 <= 0) {
      setPeriod(0);
      return;
    }

    // 활동 대사량보다 +-500kcal일 경우, 주간 체중 변화가 +-0.5kg인 것을 고려하예 기간 계산
    setPeriod(Math.round((gap / ((TDEE - targetCalories) / 1000)) * 10) / 10);
  };

  useEffect(() => {
    calculateTargetCalories();
  }, [next]);

  useEffect(() => {
    calculatePeriods(data.targetCalories);
  }, [TDEE, data.targetCalories]);

  const openModal = () => {
    setInputValue(data.targetCalories);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeTargetCalories = () => {
    setData(prevData => ({
      ...prevData,
      targetCalories: inputValue,
    }));

    closeModal();
  };

  return (
    <>
      <Title>
        <div>맞춤 계획 완성!</div>
        <div>목표를 바꿀 수도 있어요 :)</div>
      </Title>
      <SecondPageWrapper>
        <Content>
          <Column $color="grey">
            <span>내 기초 대사량</span>
            <span>{BMR} kcal</span>
          </Column>
          <Column $color="grey">
            <span>내 활동 대사량</span>
            <span>{TDEE} kcal</span>
          </Column>
        </Content>
        <Box>
          <div>내 목표 섭취 칼로리</div>
          <Column $color="black">
            <div style={{ fontSize: '2rem' }}>{data.targetCalories} kcal</div>
            <SmallButton onClick={openModal}>목표 수정</SmallButton>
            <BottomSheet
              isOpen={isOpen}
              onClose={closeModal}
              title="목표 칼로리 입력"
              signup={true}
            >
              <ModalContent $margin={nowWeight}>
                <Input
                  unit="kcal"
                  value={inputValue}
                  onChange={setInputValue}
                  isBig={true}
                  step={0.1}
                  signup={true}
                  onClick={changeTargetCalories}
                />
                <Button
                  buttonName="입력완료"
                  onClick={changeTargetCalories}
                  color="purple"
                />
              </ModalContent>
            </BottomSheet>
          </Column>
          <Target>
            <TargetIcon color={'darkpink'} />
            {period > 0 ? (
              <>
                목표 달성까지 약 <Period>{period}주</Period> 걸려요!
              </>
            ) : (
              '목표기간을 계산할 수 없어요!'
            )}
          </Target>
        </Box>
        <Button
          buttonName={nowWeight ? '수정하기' : 'UPDOWN 시작하기'}
          onClick={onClick}
          color="purple"
        />
      </SecondPageWrapper>
    </>
  );
};

export default SecondPage;
