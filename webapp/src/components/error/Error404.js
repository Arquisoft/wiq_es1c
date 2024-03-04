import image from './error404.svg';

const Error404 = () =>
{
    return (
        <div className='min-w-full min-h-screen flex justify-center flex-col items-center'>
            <img src={ image } alt={ image } className="sm:w-1/2 w-2/3" />
            <h1 className='text-white text-5xl text-center'>Página no encontrada</h1>
        </div>
    );
}

export default Error404;