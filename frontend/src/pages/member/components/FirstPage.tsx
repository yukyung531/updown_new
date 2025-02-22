import { Input, Button } from '@/components';
import {
  MaleIcon,
  FemaleIcon,
  StepOneIcon,
  StepTwoIcon,
  StepThreeIcon,
  StepFourIcon,
  StepFiveIcon,
} from '@/assets/icons';
import theme from '@/styles/theme';
import { pageProps } from '@/types/type';
import Swal from 'sweetalert2';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 1.5rem;
  display: flex:
  flex-direction: column;
`;

const Label = styled.div<{ $value?: string; $gender?: string }>`
  font-size: 1.13rem;
  text-align: ${props => (props.$gender ? 'center' : 'left')};
  color: ${props =>
    props.$gender === 'male'
      ? props.$value === '남성'
        ? theme.blue
        : theme.grey
      : props.$gender === 'female'
        ? props.$value === '여성'
          ? theme.darkpink
          : theme.grey
        : theme.black};
  padding: 0.3rem 0;
`;

const StepLabel = styled.div<{
  $size: number;
  $value: string;
  $activity: string;
}>`
  font-size: ${props => props.$size}rem;
  color: ${props => {
    switch (props.$activity) {
      case '1':
        return props.$value === '거의없음' ? theme['black'] : theme['grey'];
      case '2':
        return props.$value === '적음' ? theme['black'] : theme['grey'];
      case '3':
        return props.$value === '보통' ? theme['black'] : theme['grey'];
      case '4':
        return props.$value === '많음' ? theme['black'] : theme['grey'];
      case '5':
        return props.$value === '매우많음' ? theme['black'] : theme['grey'];
    }
  }};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RadioButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Radio = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
`;

const FirstPage = (pageProps: pageProps) => {
  const { data, setData, setNext } = pageProps;

  const changeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (data: { name: string; value: number }) => {
    const { name, value } = data;
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const goNext = () => {
    if (data.gender === '')
      return Swal.fire({
        text: '성별을 선택해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (data.age === 0)
      Swal.fire({
        text: '나이를 입력해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (data.height === 0)
      Swal.fire({
        text: '키를 입력해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (data.nowWeight === 0)
      Swal.fire({
        text: '시작 체중을 입력해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (data.targetWeight === 0)
      Swal.fire({
        text: '목표 체중을 입력해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (data.height === 0)
      Swal.fire({
        text: '평소 활동량을 선택해주세요!',
        imageUrl: '/images/alert-cat.png',
        imageWidth: 150,
        imageHeight: 150,
        confirmButtonColor: theme['purple'],
      });
    else if (setNext) setNext(true);
  };

  return (
    <>
      <Title>
        <div>맞춤 정보 제공을 위해</div>
        <div>기본 정보를 등록해주세요!</div>
      </Title>
      <RadioWrapper>
        <Label>성별</Label>
        <RadioButton>
          <label htmlFor="male">
            <MaleIcon color={data.gender === '남성' ? 'blue' : 'grey'} />
            <Label $value={data.gender} $gender="male">
              남성
            </Label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="남성"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </label>
          <label htmlFor="female">
            <FemaleIcon color={data.gender === '여성' ? 'darkpink' : 'grey'} />
            <Label $value={data.gender} $gender="female">
              여성
            </Label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="여성"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </label>
        </RadioButton>
      </RadioWrapper>
      <InputWrapper>
        <Input
          inputDir="row"
          inputName="나이"
          unit="세"
          onChange={handleChange}
          value={data.age}
          name="age"
          isRequired={true}
          starColor="red"
        />
        <Input
          inputDir="row"
          inputName="키"
          unit="cm"
          onChange={handleChange}
          value={data.height}
          name="height"
          step={0.1}
          isRequired={true}
          starColor="red"
        />
        <Input
          inputDir="row"
          inputName="시작 체중"
          unit="kg"
          onChange={handleChange}
          value={data.nowWeight}
          name="nowWeight"
          step={0.1}
          isRequired={true}
          starColor="red"
        />
        <Input
          inputDir="row"
          inputName="목표 체중"
          unit="kg"
          onChange={handleChange}
          value={data.targetWeight}
          name="targetWeight"
          step={0.1}
          isRequired={true}
          starColor="red"
        />
      </InputWrapper>
      <RadioWrapper>
        <Label>평소 활동량</Label>
        <RadioButton>
          <Radio htmlFor="1">
            <StepOneIcon
              color={data.activeLevel === '거의없음' ? 'blue' : 'grey'}
            />
            <StepLabel $size={1} $value={data.activeLevel} $activity="1">
              거의 없음
            </StepLabel>
            <StepLabel $size={0.88} $value={data.activeLevel} $activity="1">
              <div>좌식생활</div>
              <div>운동 안 함</div>
            </StepLabel>
            <input
              type="radio"
              name="activeLevel"
              id="1"
              value="거의없음"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </Radio>
          <Radio htmlFor="2">
            <StepTwoIcon
              color={data.activeLevel === '적음' ? 'darkgreen' : 'grey'}
            />
            <StepLabel $size={1} $value={data.activeLevel} $activity="2">
              적음
            </StepLabel>
            <StepLabel $size={0.88} $value={data.activeLevel} $activity="2">
              <div>주 1~3회</div>
              <div>운동</div>
            </StepLabel>
            <input
              type="radio"
              name="activeLevel"
              id="2"
              value="적음"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </Radio>
          <Radio htmlFor="3">
            <StepThreeIcon
              color={data.activeLevel === '보통' ? 'yellow' : 'grey'}
            />
            <StepLabel $size={1} $value={data.activeLevel} $activity="3">
              보통
            </StepLabel>
            <StepLabel $size={0.88} $value={data.activeLevel} $activity="3">
              <div>주 3~5회</div>
              <div>운동</div>
            </StepLabel>
            <input
              type="radio"
              name="activeLevel"
              id="3"
              value="보통"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </Radio>
          <Radio htmlFor="4">
            <StepFourIcon
              color={data.activeLevel === '많음' ? 'orange' : 'grey'}
            />
            <StepLabel $size={1} $value={data.activeLevel} $activity="4">
              많음
            </StepLabel>
            <StepLabel $size={0.88} $value={data.activeLevel} $activity="4">
              <div>주 6~7회</div>
              <div>운동</div>
            </StepLabel>
            <input
              type="radio"
              name="activeLevel"
              id="4"
              value="많음"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </Radio>
          <Radio htmlFor="5">
            <StepFiveIcon
              color={data.activeLevel === '매우많음' ? 'darkpink' : 'grey'}
            />
            <StepLabel $size={1} $value={data.activeLevel} $activity="5">
              매우 많음
            </StepLabel>
            <StepLabel $size={0.88} $value={data.activeLevel} $activity="5">
              <div>하루 2번</div>
              <div>매일 운동</div>
            </StepLabel>
            <input
              type="radio"
              name="activeLevel"
              id="5"
              value="매우많음"
              style={{ display: 'none' }}
              onChange={changeRadio}
            />
          </Radio>
        </RadioButton>
      </RadioWrapper>
      <Button buttonName="등록하기" onClick={goNext} color="purple" />
    </>
  );
};

export default FirstPage;
