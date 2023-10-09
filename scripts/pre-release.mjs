// eslint-disable-next-line import/no-extraneous-dependencies
import inquirer from 'inquirer';

async function askQuestions() {
  const answer = await inquirer.prompt([
    {
      name: 'updated',
      type: 'list',
      message: 'Have you updated CHANGELOG.md',
      pageSize: 2,
      choices: ['Yes', 'No'],
    },
  ]);
  if (answer.updated === 'No') throw new Error('Please Update CHANGELOG.md ...');
}

async function main() {
  await askQuestions();
}

main();
