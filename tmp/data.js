global.jsRequire ? global.jsRequire.push('./tmp/data.js') : global.jsRequire = ['./tmp/data.js'];
export default {
  courses: [
    {
      subTitle: 'Handheld honeymoon',
      title: 'Beginner',
      items: [
        { title: 'HTML/CSS tasting', subTitle: 'Make your first website', description: 'At our online platform you can find courses created to help you learn, in easy to follow steps with some sparks of fun.', type: 'Beginner', duration: '1 - 2 hours' },
        { title: 'Javascript', subTitle: 'Try javascript for the first time'},
        { title: 'Talk to a local', subTitle: 'Choose a programming language'},
        { title: 'Guided tour', subTitle: 'Do a tutorial & learn the basics'},
        { title: 'Javascript game', subTitle: 'Remix a javascript game'},
      ]
    },
    {
      subTitle: 'Cliffs of confusion',
      title: 'Intermediate',
      items: [
        { title: 'Get a ski pass', subTitle: 'Use the commandline'},
        { title: 'Rent skiing gear', subTitle: 'Install you language & tools'},
        { title: 'Spend a day skiing', subTitle: 'Make a small project'},
      ]
    },
    {
      subTitle: 'Desert of despair',
      title: 'Advanced',
      items: [
        { title: 'Buy a camel', subTitle: 'Learn git (basics)'},
        { title: 'Trade with the locals', subTitle: 'Use an api'},
        { title: 'Visit the oasis', subTitle: 'Talk to a developer for advice'},
      ]
    },
    {
      subTitle: 'Achipelago of Awesome',
      title: 'Advanced',
      items: [
        { title: 'Go on an advanture', subTitle: 'set your own goal'},
      ]
    }
  ]
}
