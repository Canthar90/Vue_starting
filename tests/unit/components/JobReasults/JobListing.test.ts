import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import type { Job } from '@/api/types'
import JobListing from '@/components/JobReasults/JobListing.vue'
import { createJob } from 'tests/utils/createJob'

describe('JobListing', () => {
  const renderJobListing = (job: Job) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...job
        }
      }
    })
  }

  it('renders job title', () => {
    const jobProps = createJob({ title: 'Vue Developer' })
    renderJobListing(jobProps)

    expect(screen.getByText('Vue Developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    const jobProps = createJob({ organization: 'Any Corp' })
    renderJobListing(jobProps)

    expect(screen.getByText('Any Corp')).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJob({
      locations: ['Orlando', 'Torun']
    })
    renderJobListing(jobProps)

    expect(screen.getByText('Orlando')).toBeInTheDocument()
    expect(screen.getByText('Torun')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJob({
      minimumQualifications: ['Hands', 'Licking elbow']
    })
    renderJobListing(jobProps)

    expect(screen.getByText('Hands')).toBeInTheDocument()
    expect(screen.getByText('Licking elbow')).toBeInTheDocument()
  })
})
