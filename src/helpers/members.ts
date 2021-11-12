export interface Member {
  name: string;
  img: string;
  bio: string;
  website?: string;
  linkedin?: string;
  github?: string;
}

const members: Member[] = [
  {
    name: 'Vijay Ganesh',
    img: 'generic-person.png',
    bio: `
      Our amazing consultant.`,
  },
  {
    name: 'Jason Antao',
    img: 'jason-antao.jpg',
    bio: `
      A hard-working and creative innovator, he never settles for mediocrity in design and principle. His
      studies as a Computer Engineering student at the University of Waterloo along with his work experience
      has inspired him to apply his talents in meaningful ways that enable individuals and businesses (aka:
      talented groups of people) to live their best lives no matter where they come from.`,
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
    linkedin: 'https://www.linkedin.com/in/jadon-fan-414993141/',
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
    linkedin: 'https://www.linkedin.com/in/qian-chandler-l-486069137/',
    github: 'https://github.com/chandlerlei2017',
  },
];

export default members;
