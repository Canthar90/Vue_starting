import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobReasults/JobListing.vue'

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'Any Corp',
    ...jobProps
  })

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          ...jobProps
        }
      }
    })
  }

  it('renders job title', () => {
    const jobProps = createJobProps()
    renderJobListing(jobProps)

    expect(screen.getByText('Vue Developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    const jobProps = createJobProps()
    renderJobListing(jobProps)

    expect(screen.getByText('Any Corp')).toBeInTheDocument()
  })

  it('renders job locations', () => {
    const jobProps = createJobProps({
      locations: ['Orlando', 'Torun']
    })
    renderJobListing(jobProps)

    expect(screen.getByText('Orlando')).toBeInTheDocument()
    expect(screen.getByText('Torun')).toBeInTheDocument()
  })

  it('renders job qualifications', () => {
    const jobProps = createJobProps({
      minimumQualifications: ['Hands', 'Licking elbow']
    })
    renderJobListing(jobProps)

    expect(screen.getByText('Hands')).toBeInTheDocument()
    expect(screen.getByText('Licking elbow')).toBeInTheDocument()
  })
})
