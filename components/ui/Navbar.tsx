import { Link, Spacer, Text, useTheme } from "@nextui-org/react"
import Image from 'next/image';
import NextLink from 'next/link';

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <div style={{

      display: 'flex',
      width: '100',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'start',
      padding: '0px 50px',
      backgroundColor: theme?.colors.gray900.value

    }}>


      <NextLink href="/" passHref>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="icono de la app"
            width={70}
            height={70}
          />
          <Text color="white" h2>P</Text>
          <Text color="white" h3>okemon</Text>
        </div>
      </NextLink>

      <Spacer css={{ flex: 1 }} />

      <NextLink href="/favorites" passHref>
        <Text color="white" h3>Favoritos</Text>
      </NextLink>

    </div>
  )
}
