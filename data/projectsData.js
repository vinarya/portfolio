const projectsData = [
  {
    title: 'Glimpz Music',
    date: '2017-05-15',
    field: 'cs',
    description: `Glimpz is the flagship product of Audion Technologies, a startup co-founded by myself and my friend Dhruv Tiwari. 
    Designed to revolutionize the way you discover music, Glimpz is an app that seamlessly integrates with your Spotify account to 
    offer personalized song recommendations.`,
    skills: ['react', 'AWS', 'javascript', 'UI/UX', 'Graphic Design'],
    imgSrc: '/static/images/glimpz.png',
    href: '/project/glimpz',
  },
  {
    title: 'MAT-4: STAR',
    date: '2018-05-15',
    field: 'aero',
    description: `The MAT 4: STAR is an autonomous aircraft with a maximum take off weight of 40 lbs, leveraging computer vision for 
    targeted payload deliveries. It can carry five 2.16 lb payloads, rotated and dropped via an in-fuselage revolving mechanism.`,
    skills: ['CAD', 'Pixhawk', 'FEA', 'PID', 'Electronics', 'Composites'],
    imgSrc: '/static/images/mat-4.png',
    href: '/project/mat-4',
  },
  {
    title: 'MD-UAV',
    date: '2019-05-15',
    field: 'aero',
    description: `MD-UAV (Medical UAV) is an on going research project at the University of Michigan 
    with the aim to develop a Hybrid Vertical Take-off and landing aircraft for rapid deployments of 
    medical supplies in remote regions.`,
    skills: ['CAD', 'Pixhawk', 'FEA', 'PID', 'Electronics', 'Composites'],
    imgSrc: '/static/images/mduav.png',
    href: '/project/md-uav',
  },
  {
    title: 'Spyro',
    date: '2020-05-15',
    field: 'aero',
    description: `SpyRo is an all terrain UGV platform with four caterpillar tracks. Each 
    of these caterpillar tracks can change orientation independently giving SpyRo the ability 
    to tackle any terrain while keeping a low profile. `,
    skills: ['Raspberry Pi', 'CAD', 'Controls'],
    imgSrc: '/static/images/spyro.png',
    href: '/project/spyro',
  },
  {
    title: 'FireFly',
    date: '2016-05-15',
    field: 'aero',
    description: `FireFly is a fire fighting hexacopter that uses a raspberry pi and a flight control 
    board to look for heat signatures corresponding to fire. It then flies towards it and 
    dispenses fire retardant from an off the shelf fire extinguisher. Its payload bay can 
    be used to house several types of fire extinguishers (ex, Type A, B, C, etc.)`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID', 'Thermal Imaging'],
    imgSrc: '/static/images/firefly.png',
    href: '/project/firefly',
  },
  {
    title: 'Robust',
    date: '2015-05-15',
    field: 'aero',
    description: `
    Robust is a 360-degree rotating robotic arm mounted on a UGV, initially crafted from balsa wood and controlled by a 16-channel remote for a science fair.
    I optimized its functionality using Arduino Mega, reducing the control channels to 7. The second iteration incorporates 3D-printed parts for lightweight strength.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/robust.png',
    href: '/project/robust',
  },
  {
    title: 'Garber',
    date: '2014-05-15',
    field: 'aero',
    description: `Garber is a cleaning robot. 
    It utilises an articulated foam brush to collect big debris, while the smaller dust 
    particles are drawn through the vacuum. Furthermore, it includes a reservoir that dispenses 
    water or cleaning solution of your choice as the foam roller just behind it wipes the 
    floor clean. `,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/garber.png',
    href: '/project/garber',
  },
  {
    title: 'Little Tornado',
    date: '2013-05-15',
    field: 'aero',
    description: `Little Tornado is a model aircraft that I designed myself. There are two variants of 
    Little Tornado: high wing and low wing. The high wing variant is easier to 
    fly and ideal for beginners. The low wing variant is sportier and geared 
    towards more intermediate flyers.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/little_tornado.png',
    href: '/project/little-tornado',
  },
  {
    title: 'Igor',
    date: '2017-05-15',
    field: 'aero',
    description: `Igor is an all terrain vehicle that can seat two people. It's equipped 
    with caterpillar tracks driven by two 125cc engines, making it perfect 
    for off-road exploration. It uses a Raspberry Pi and a slew of high torque 
    servos in order to allow for remote operation.`,
    skills: ['Pixhawk', 'Raspberry Pi', 'PID'],
    imgSrc: '/static/images/igor.png',
    href: '/project/igor',
  },
]

export default projectsData
