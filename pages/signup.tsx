import { firestore } from '../lib/firebaseConfig/init';
import Head from 'next/head'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../lib/authContext'
import debounce from 'lodash.debounce';
import { doc, getDoc, collection, addDoc, setDoc, getDocs} from 'firebase/firestore';
import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  VStack,
  StackDivider,
  IconProps,
  Icon,
} from '@chakra-ui/react';
import { delBasePath } from 'next/dist/shared/lib/router/router';
const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

export default function Home() {
  const { user , username, loading} = useAuth()

  return (
    <main>{user ? !username ? <UsernameForm /> :<ProfilePage /> : <SignUpButton />}</main>
  )

}

function SignUpButton() {
  const [ email , setEmail ] =  useState<string>('')
  const [ password , setPassword ] =  useState<string>('')

  const auth = getAuth()
  function createUserCredentials(){
  createUserWithEmailAndPassword(auth, email, password)
    .then( userCredential => {
      const user = userCredential.user;
      console.log('success', user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('error', errorMessage)
      window.alert(errorMessage)
      // ..
    });
  }
  return (
    <>
    <Head>
      <title>Signup</title>
    </Head>
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Welcome to Web DAO 2.5{' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              &   
            </Text>{' '}
            The Future is Now
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            {/* size={useBreakpointValue({ base: 'md', md: 'lg' })} */}
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  // src={avatar.url}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({ base: '44px', md: '60px' })}
              height={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Sign up for your DAO 
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                !
              </Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              This world needs amazing community builder just like you!
            </Text>
          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              {/* <Input
                placeholder="Username"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              /> */}
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min. 6 characters)"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              {/* <Input
                placeholder="+1 (___) __-___-___"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              /> */}
              {/* <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload CV
              </Button> */}
            </Stack>
            <Button
              onClick={createUserCredentials}
              fontFamily={'heading'}
              mt={4}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}>
              Sign Up
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      {/* <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      /> */}
    </Box>
    </>
  );
}
function ProfilePage() {
  return <>
  <h1>Hey</h1>
  </>

}

function UsernameForm() {
  const [formValue, setFormValue] = useState(''); //user enter name 
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {username, user} = useAuth();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {        
        const docRef = doc(firestore, 'usernames', username);
        const docSnap = await getDoc(docRef)
        const exists = docSnap.exists();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );
  const onChange = (e: React.ChangeEvent<any>) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const onSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await setDoc(doc(firestore, "usernames", formValue), {
      uid: currentUser?.uid,
    })    
    await setDoc(doc(firestore, "users", currentUser!.uid), {
      uid: currentUser?.uid,
      email: currentUser?.email,
      username: formValue
    })  

  };

  return <>{(
    !username && (
      <section>
          <form onSubmit={onSubmit}>
          {/* <Box m={10}>
            <VStack
            divider={<StackDivider borderColor='white' />}
            spacing={1}
            align='stretch'> */}
            <input placeholder="Username (min. 3 characters)" value={formValue} onChange={onChange} ></input>
            <br />
            <button disabled={!isValid}>Choose</button>
              {/* <Input placeholder="Username (min. 3 characters)" size='lg' value={formValue} onChange={onChange} /> */}
              <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

{/* 
              <div>
                Username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
              </div> */}
            {/* </VStack>
            </Box> */}
          </form>
          {/* <Button 
                fontFamily={'heading'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',}}
                disabled={!isValid}>
              Choose
              </Button> */}
      </section>
    )
  )}</>;


}

interface Props {
  username: string
  isValid: boolean
  loading: any
}

function UsernameMessage(props:Props): any{
  const { loading, isValid, username } = props;

  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <Text color='green'>{username} is available!</Text>;
  } else if (username.length < 3 && username.length> 0) {
    return <Text color='tomato'>{username} is too short!</Text>;
  } else if (username && !isValid) {
    return <Text color='tomato'>{username} is taken!</Text>;
  } else {
    return <p></p>;
  }
}