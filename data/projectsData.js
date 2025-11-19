const projectsData = [
  {
    title: 'Kestrel Mini',
    date: '2023-10-09',
    field: 'aero',
    featured: true,
    description: `Explore the making of this portfolio website, built with Next.js and hosted on Bluehost. This project serves as 
    a comprehensive showcase of my skills in web development, UI/UX design, and more. Get insights into the technical architecture, 
    features, and the challenges faced during development.`,
    skills: ['VTOL', 'Tailsitter', 'CAD/CAM', 'Betaflight', 'Additive Manufacturing'],
    imgSrc: '/static/images/palindrone.png',
    href: '/project/kestrel-mini',
  },
  {
    title: 'MAT-4: STAR',
    date: '2023-04-29',
    field: 'aero',
    featured: true,
    description: `The MAT 4: STAR is an autonomous aircraft with a maximum take off weight of 40 lbs, leveraging computer vision for 
    targeted payload deliveries. It can carry five 2.16 lb payloads, rotated and dropped via an in-fuselage revolving mechanism.`,
    skills: ['CAD', 'Pixhawk', 'FEA', 'PID', 'Electronics', 'Composites', 'Additive Manufacturing'],
    imgSrc: '/static/images/mat-42.png',
    href: '/project/mat-4',
  },
  {
    title: 'MD-UAV',
    date: '2023-05-15',
    field: 'aero',
    featured: false,
    description: `MD-UAV (Medical UAV) is an on going research project at the University of Michigan 
    with the aim to develop a Hybrid Vertical Take-off and landing aircraft for rapid deployments of 
    medical supplies in remote regions.`,
    skills: ['CAD', 'Pixhawk', 'FEA', 'PID', 'Electronics', 'Composites', 'Additive Manufacturing'],
    imgSrc: '/static/images/mduav2.png',
    href: '/project/md-uav',
  },
  {
    title: 'Portfolio Website',
    date: '2023-09-25',
    field: 'cs',
    featured: false,
    description: `Explore the making of this portfolio website, built with Next.js and hosted on Bluehost. This project serves as 
    a comprehensive showcase of my skills in web development, UI/UX design, and more. Get insights into the technical architecture, 
    features, and the challenges faced during development.`,
    skills: ['react', 'Next.js', 'javascript', 'UI/UX', 'Graphic Design'],
    imgSrc: '/static/images/portfolio-website.png',
    href: '/project/portfolio-website',
  },
  {
    title: 'Glimpz Music',
    date: '2023-09-28',
    field: 'cs',
    featured: false,
    description: `Glimpz is the flagship product of Audion Technologies, a startup co-founded by myself and my friend Dhruv Tiwari. 
    Designed to revolutionize the way you discover music, Glimpz is an app that seamlessly integrates with your Spotify account to 
    offer personalized song recommendations.`,
    skills: ['react', 'AWS', 'javascript', 'UI/UX', 'Graphic Design'],
    imgSrc: '/static/images/glimpz.png',
    href: '/project/glimpz',
  },
  {
    title: 'MD-UAV Lite',
    date: '2023-09-28',
    field: 'aero',
    featured: false,
    description: `MD-UAV (Medical UAV) is an on going research project at the University of Michigan 
    with the aim to develop a Hybrid Vertical Take-off and landing aircraft for rapid deployments of 
    medical supplies in remote regions.`,
    skills: [
      'VTOL',
      'QuadPlane',
      'CAD/CAM',
      'PX-4',
      'Composites',
      'Tilt Rotor',
      'PID',
      'Additive Manufacturing',
    ],
    imgSrc: '/static/images/mduav-lite.png',
    href: '/project/md-uav-lite',
  },
  {
    title: 'Portfolio Website Version 2',
    date: '2022-07-12',
    field: 'cs',
    featured: false,
    description: `An earlier version of my portfolio website, designed to offer a comprehensive look into my 
    skills and projects. Built with HTML, CSS, and JavaScript, it features detailed project pages and interactive elements.`,
    skills: ['HTML', 'CSS', 'javascript', 'UI/UX', 'Graphic Design'],
    imgSrc: '/static/images/old-portfolio.png',
    href: '/project/portfolio-v2',
  },
  {
    title: 'Spyro',
    date: '2020-05-15',
    field: 'aero',
    featured: false,
    description: `SpyRo is an all terrain UGV platform with four caterpillar tracks. Each 
    of these caterpillar tracks can change orientation independently giving SpyRo the ability 
    to tackle any terrain while keeping a low profile. `,
    skills: ['Raspberry Pi', 'CAD', 'Controls'],
    imgSrc: '/static/images/spyro2.png',
    href: '/project/spyro',
  },
  {
    title: 'FireFly',
    date: '2018-07-25',
    field: 'aero',
    featured: false,
    description: `FireFly is a fire fighting hexacopter that uses a raspberry pi and a flight control 
    board to look for heat signatures corresponding to fire. It then flies towards it and 
    dispenses fire retardant from an off the shelf fire extinguisher. Its payload bay can 
    be used to house several types of fire extinguishers (ex, Type A, B, C, etc.)`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID', 'Thermal Imaging'],
    imgSrc: '/static/images/firefly2.png',
    href: '/project/firefly',
  },
  {
    title: 'Robust',
    date: '2017-05-15',
    field: 'aero',
    featured: false,
    description: `
    Robust is a 360-degree rotating robotic arm mounted on a UGV, initially crafted from balsa wood and controlled by a 16-channel remote for a science fair.
    I optimized its functionality using Arduino Mega, reducing the control channels to 7. The second iteration incorporates 3D-printed parts for lightweight strength.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/robust2.png',
    href: '/project/robust',
  },
  {
    title: 'Garber',
    date: '2017-08-15',
    field: 'aero',
    featured: false,
    description: `Garber is a cleaning robot. 
    It utilises an articulated foam brush to collect big debris, while the smaller dust 
    particles are drawn through the vacuum. Furthermore, it includes a reservoir that dispenses 
    water or cleaning solution of your choice as the foam roller just behind it wipes the 
    floor clean. `,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/garber2.png',
    href: '/project/garber',
  },
  {
    title: 'Little Tornado',
    date: '2017-05-15',
    field: 'aero',
    featured: false,
    description: `Little Tornado is a model aircraft that I designed myself. There are two variants of 
    Little Tornado: high wing and low wing. The high wing variant is easier to 
    fly and ideal for beginners. The low wing variant is sportier and geared 
    towards more intermediate flyers.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/little_tornado2.png',
    href: '/project/little-tornado',
  },
  {
    title: 'Igor',
    date: '2017-05-15',
    field: 'aero',
    featured: true,
    description: `Igor is an all terrain vehicle that can seat two people. It's equipped 
    with caterpillar tracks driven by two 125cc engines, making it perfect 
    for off-road exploration. It uses a Raspberry Pi and a slew of high torque 
    servos in order to allow for remote operation.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/igor2.png',
    href: '/project/igor',
  },
]

export default projectsData
