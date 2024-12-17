import db, { genId } from '../../src/modules/db';
import bcrypt from 'bcryptjs';

const run = async () => {
  await db.post.deleteMany();
  await db.user.deleteMany();

  const hashedPassword = await bcrypt.hash('admin', 10);

  await db.user.createMany({
    data: [
      // Professores (ADMIN)
      {
        name: 'Sadi Carnot',
        email: 'sadi.carnot@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
      {
        name: 'Fiódor Dostoiévski',
        email: 'fiodor.d@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
      {
        name: 'Friedrich Nietzsche',
        email: 'nietzsche@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
      {
        name: 'Virginia Woolf',
        email: 'virginia.woolf@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },
      {
        name: 'Homer',
        email: 'homer@example.com',
        password: hashedPassword,
        role: 'ADMIN',
      },

      // Alunos (MEMBER)
      {
        name: 'Dante Alighieri',
        email: 'dante@example.com',
        password: hashedPassword,
        role: 'MEMBER',
      },
      {
        name: 'Jean-Paul Sartre',
        email: 'sartre@example.com',
        password: hashedPassword,
        role: 'MEMBER',
      },
      {
        name: 'Simone de Beauvoir',
        email: 'simone@example.com',
        password: hashedPassword,
        role: 'MEMBER',
      },
      {
        name: 'Fernando Pessoa',
        email: 'pessoa@example.com',
        password: hashedPassword,
        role: 'MEMBER',
      },
      {
        name: 'Sylvia Plath',
        email: 'plath@example.com',
        password: hashedPassword,
        role: 'MEMBER',
      },
    ],
  });

  const createdProfessors = await db.user.findMany({
    where: { role: 'ADMIN' },
  });

  await db.post.createMany({
    data: [
      {
        id: genId(),
        slug: 'fundamentos-de-termodinamica',
        title: 'Fundamentos de Termodinâmica',
        content: 'Reflexões sobre a Potência Motriz do Fogo',
        author: 'Sadi Carnot',
        userId: createdProfessors.find((u) => u.name === 'Sadi Carnot')?.id,
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'introducao-a-literatura-russa',
        title: 'Introdução à Literatura Russa',
        content:
          'Os Irmãos Karamazov, Guerra e Paz, Pais e Filhos, Doutor Jivago...',
        author: 'Fiódor Dostoiévski',
        userId: createdProfessors.find((u) => u.name === 'Fiódor Dostoiévski')
          ?.id,
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'assim-falou-zaratustra',
        title: 'Assim Falou Zaratustra',
        content:
          'Uma obra sobre a filosofia do eterno retorno e do super-homem.',
        author: 'Friedrich Nietzsche',
        userId: createdProfessors.find((u) => u.name === 'Friedrich Nietzsche')
          ?.id,
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'ao-faro-de-um-livro',
        title: 'Ao Faro de um Livro',
        content: 'Um ensaio experimental que explora os limites da literatura.',
        author: 'Virginia Woolf',
        userId: createdProfessors.find((u) => u.name === 'Virginia Woolf')?.id,
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'a-ilada',
        title: 'A Ilíada',
        content:
          'O épico grego que descreve a Guerra de Troia e a jornada de Aquiles.',
        author: 'Homer',
        userId: createdProfessors.find((u) => u.name === 'Homer')?.id,
        publishedAt: new Date(),
      },
      {
        id: genId(),
        slug: 'a-divina-comedia',
        title: 'A Divina Comédia',
        content:
          'Uma alegoria poética que descreve a viagem através do Inferno, Purgatório e Paraíso.',
        author: 'Dante Alighieri',
        userId: createdProfessors.find((u) => u.name === 'Dante Alighieri')?.id,
        publishedAt: new Date(),
      },
    ],
  });

  console.log('Seeded database with professors and students!');
};

if (require.main === module) {
  run().then(() => {
    process.exit();
  });
}
