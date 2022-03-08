interface Consultants {
  readonly name: string;
  readonly img: `${string}.jpg`;
  readonly bio: string;
  readonly website?: `https://${string}`;
  readonly linkedin?: `https://www.linkedin.com/in/${string}`;
}

const consultants: readonly Consultants[] = [
  {
    name: 'Vijay Ganesh',
    img: 'ganesh.jpg',
    bio: `Dr. Vijay Ganesh is an associate professor at the University of Waterloo and the Co-Director of the Waterloo Artificial Intelligence Institute. Prior to joining Waterloo in 2012, he was a research scientist at MIT (2007-2012) and completed his PhD in computer science from Stanford in 2007. Vijay's primary area of research is the theory and practice of SAT/SMT solvers aimed at AI, software engineering, security, mathematics, and physics. In this context he has led the development of many SAT/SMT solvers, most notably, STP, Z3 string, MapleSAT, and MathCheck. He has also proved several decidability and complexity results in the context of first-order theories. He has won over 25 awards, honors, and medals to-date for his research, including an ACM Impact Paper Award at ISSTA 2019, ACM Test of Time Award at CCS 2016, and a Ten-Year Most Influential Paper citation at DATE 2008. He is the Editor-in-Chief of the Springer book series "Progress in Computer Science and Applied Logic" (PCSAL) and has co-chaired many conferences, workshops, and seminars including a Simons Institute semester @ Berkeley on Boolean Satisfiability in 2021.`,
    website: 'https://ece.uwaterloo.ca/~vganesh/',
    linkedin: 'https://www.linkedin.com/in/ganeshvijay/',
  },
];

export default consultants;
