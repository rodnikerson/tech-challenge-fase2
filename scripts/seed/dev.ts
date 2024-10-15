import db, { genId } from '../../src/modules/db';

const run = async () => {
  await db.post.deleteMany();

  await db.post.createMany({
    data: [
      {
        id: genId(),
        slug: 'fundamentos-de-termodinamica',
        title: 'Fundamentos de Termodinâmica',
        content: 'Reflexões sobre a Potência Motriz do Fogo',
        author: 'Sadi Carnot',
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'introducao-a-literatura-russa',
        title: 'Introdução a Literatura Russa',
        content:
          'Os Irmãos Karamazov, Guerra e Paz, Pais e Filhos, Doutor Jivago...',
        author: 'Fiódor Dostoiévski',
        publishedAt: new Date(),
      },
    ],
  });
};

if (require.main === module) {
  run().then(() => {
    console.log('Seeded database!');
    process.exit();
  });
}
