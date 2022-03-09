interface Member {
  readonly name: string;
  readonly img: `${string}.jpg`;
  readonly bio: string;
  readonly website?: `https://www.${string}`;
  readonly linkedin?: `https://www.linkedin.com/in/${string}`;
  readonly github?: `https://github.com/${string}`;
}

const members: readonly Member[] = [
  {
    name: 'Jason Antao',
    img: 'jason-antao.jpg',
    bio: `
      A hard-working and creative innovator, he never settles for mediocrity in design and principle. His
      studies as a Computer Engineering student at the University of Waterloo along with his years of intense work experience
      have inspired him to apply his talents in meaningful ways. Jason delivers on the details that matter, listens well, and thinks in scale. Most importantly,
      he knows that learning is a lifelong process that he enjoys.`,
    website: 'https://www.jasonantao.com/',
    linkedin: 'https://www.linkedin.com/in/antaojason/',
    github: 'https://github.com/jasonantao',
  },
  {
    name: 'Jadon Fan',
    img: 'jadon-fan.jpg',
    bio: `
      A determined and attentive engineer, he is always exploring new challenges and putting his critical thinking
      skills to the test. With the knowledge and skills that he has accumulated over his years of studies as a
      Computer Engineering student and 16+ months of co-op experience, he carries a huge arsenal of problem-solving
      tools.`,
    website: 'https://www.jadonfan.com/',
    linkedin: 'https://www.linkedin.com/in/jadon-fan/',
    github: 'https://github.com/JadonFan',
  },
  {
    name: 'Chandler Lei',
    img: 'chandler-lei.jpg',
    bio: `
      A compassionate engineer with a sharp mind, he gives his all in academics, career, and relationships.
      Being a seasoned startup veteran from numerous previous internships, he is cool under pressure and brings
      a breadth of skills ranging from design to development to deployment. He wears a lot of different hats and
      loves applying himself to causes that can drive societal impact in the world.`,
    website: 'https://www.chandlerlei.dev/',
    linkedin: 'https://www.linkedin.com/in/chandlerlei/',
    github: 'https://github.com/chandlerlei2017',
  },
  {
    name: 'Mivia Li',
    img: 'mivia-li.jpg',
    bio: `
      A rockstar teammate with amazing skills`,
    linkedin: 'https://www.linkedin.com/in/mivia-li/',
    github: 'https://github.com/Mivialll',
  },
  {
    name: 'Priyanka Hariharan',
    img: 'priyanka-hariharan.jpg',
    bio: `A rockstar teammate with amazing skills`,
    linkedin: 'https://www.linkedin.com/in/priyanka-h/',
    github: 'https://github.com/PriyankaH21',
  },
  {
    name: 'Boris Nguyen',
    img: 'boris-nguyen.jpg',
    bio: `A rockstar teammate with amazing skills`,
    linkedin: 'https://www.linkedin.com/in/boris-nguyen/',
    github: 'https://github.com/boris-nguyen',
  },
];

export default members;
