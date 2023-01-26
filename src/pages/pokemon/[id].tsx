import { useState } from 'react';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from 'api';
import confetti from 'canvas-confetti'
import { Layout } from 'components/layouts/Layout';
import { Pokemon } from 'interfaces';
import { ParsedUrlQuery } from 'querystring';
import { localFavorites } from 'utils';
import { getPokemonInfo } from '../../../utils/getPokemonInfo';

interface Props {
    pokemon: Pokemon;
}

interface Params extends ParsedUrlQuery {
    id: string;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {

    console.log(pokemon);

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites( pokemon.id ));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites( !isInFavorites );

        if( !isInFavorites ) return;

        var defaults = {
            spread: 360,
            ticks: 70,
            gravity: 0,
            angle: -100,
            decay: 0.94,
            zIndex: 999,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
            origin: { x: 0, y: 0 }
          };
          
          function shoot() {
            confetti({
              ...defaults,
              particleCount: 200,
              scalar: 1.2,
              shapes: ['star']
            });
          
            confetti({
              ...defaults,
              particleCount: 10,
              scalar: 0.75,
              shapes: ['circle']
            });
          }
          
          setTimeout(shoot, 0);
          setTimeout(shoot, 100);
          setTimeout(shoot, 200);
        
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || 'no-image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height={200}
                            />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button
                                color="gradient"
                                ghost={ !isInFavorites }
                                onClick={onToggleFavorite}
                            >
                                { isInFavorites ? 'En favoritos' : 'Guardar en favoritos'}
                            </Button>
                        </Card.Header>


                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex' gap={ 0 }>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>

            </Grid.Container>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const paths = [...Array(151)].map((_, index) => ({
        params: { id: `${index + 1}` },
    }));

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };

    
    return {
        props: {
            pokemon: await getPokemonInfo( id )
        },
    };
};

export default PokemonPage;