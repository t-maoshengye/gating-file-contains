import * as core from '@actions/core'
import {wait} from './wait'

async function run(): Promise<void> {
  try {
    const ms: string = core.getInput('milliseconds')
    const cm: string = core.getInput('commit_message')
    const rt: string = core.getInput('request_title')
    if (rt.includes('no gating check')) {
      core.info(`✅ The PR title containing 'no gating check'`)
    } else if (cm.includes('no gating check')) {
      core.info(`✅ The commit containing 'no gating check'`)
    } else if (rt) {
      core.info(`📝 PR Title: ${rt}`)
    } else {
      core.info(`📝 Commit: ${cm}`)
    }

    core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    core.debug(new Date().toTimeString())
    await wait(parseInt(ms, 10))
    core.debug(new Date().toTimeString())

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
