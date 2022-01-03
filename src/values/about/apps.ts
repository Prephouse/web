interface App {
  readonly marketingName: string;
  readonly internalName: `ph-${string}`;
  readonly description: string;
  readonly points?: string[];
  readonly techStack: [language: string, ...libraries: string[]];
  readonly productionUrl?: `https://www.${string}`;
  readonly sourceCodeUrl?: string;
}

const apps: readonly App[] = [
  {
    marketingName: 'prephouse.io',
    internalName: 'ph-web',
    description: `
      Our primary application with all the complete major features`,
    points: [
      'Optimized for both mobile and desktop',
      "Follows Google's material design guidelines",
      'Offers localization (l10n) support',
      'Compliant with WCAG 2.1 AA for accessibility (a11y)',
      "Served over HTTPS with a SSL certificate from the Let's Encrypt CA",
      'Hosted on Netlify',
    ],
    techStack: ['TypeScript', 'React', 'Redux', 'Axios', 'MUI5', 'Emotion', 'Jest', 'Enzyme'],
    productionUrl: 'https://www.prephouse.io',
  },
  {
    marketingName: 'Prephouse Backend',
    internalName: 'ph-backend',
    description: `
      Our backend server — which includes the REST APIs, Flask-SQLAlchemy models,
      and Marshmallow schemas — for our client-facing apps`,
    points: [
      'Enforces a HSTS mechanism',
      'Protected against SQLi attacks through input sanitization and query parameterization',
      'Protected against XSS attacks through for example restrictive CSP headers',
      'Protected against DoS attacks through reCAPTCHA validations and API rate limiters',
      'Protected against CSRF attacks through the validation of CSRF tokens',
      'Configures the proper headers to prevent other security issues such as click-jacking and content type sniffing',
      'Relies on secure HTTP-only cookie-based authentication',
    ],
    techStack: ['Python', 'Flask', 'SQLAlchemy', 'PostgreSQL', 'Marshmallow', 'boto3', 'pytest'],
  },
  {
    marketingName: 'Prephouse Analyzer Engine',
    internalName: 'ph-analyzer',
    description: `
      Analyzes mock interviews and presentations and generates feedback for our users`,
    techStack: ['Python', 'OpenCV', 'Tensorflow', 'NumPy', 'Pandas', 'gRPC'],
  },
];

export default apps;
