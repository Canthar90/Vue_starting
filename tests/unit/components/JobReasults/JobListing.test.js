import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import JobListing from '@/components/JobReasults/JobListing.vue'

describe('JobListing', () => {
  it('renders job title', () => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          title: 'Vue Developer'
        }
      }
    })

    expect(screen.getByText('Vue Developer')).toBeInTheDocument()
  })

  it('renders job organization', () => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      },
      props: {
        job: {
          organization: 'Any Corp'
        }
      }
    })

    expect(screen.getByText('Any Corp')).toBeInTheDocument()
  })
})
