import Head from 'next/head';
import Image from 'next/image';
import { Typography } from '@mui/material';
import { useUser } from '../context/AuthContext';

export default function Home() {
  const { user } = useUser();
  console.log("USER: ", user);

  return (
    <Typography variant='h1'>Hello World!</Typography>
  )
}
