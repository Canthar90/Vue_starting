import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import type { Job } from '@/api/types'
import SingleJobOffer from '@/components/JobView/SingleJobOffer.vue'
import { createJob } from 'tests/utils/createJob'

describe('SingleJobOffer', () => {
  const renderSingleJobOffer = (job: Job) => {
    render(SingleJobOffer, {
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

  const propsData = {
    id: 1,
    title: 'Vue Developer',
    organization: 'Evil Corp',
    degree: 'Highest',
    jobType: 'Junior',
    locations: ['La', 'NYC'],
    minimumQualifications: ['Great', 'Qualifications'],
    preferredQualifications: ['Preferred', 'Skills'],
    description: ['Description', 'List'],
    dateAdded: 'Some date'
  }

  it('renders content of job offer title', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Vue Developer')).toBeInTheDocument()
  })

  it('renders content of job organization', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Evil Corp:')).toBeInTheDocument()
  })

  it('renders content of jobs degree', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Highest')).toBeInTheDocument()
  })

  it('renders content of jobType', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Job lvl Junior')).toBeInTheDocument()
  })

  it('renders content of locations', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('NYC,')).toBeInTheDocument()
    expect(screen.getByText('La,')).toBeInTheDocument()
  })

  it('renders content of minimumQualifications', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Great')).toBeInTheDocument()
    expect(screen.getByText('Qualifications')).toBeInTheDocument()
  })

  it('renders content of preferredQualifications', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Preferred')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })

  it('renders contents of description', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('List')).toBeInTheDocument()
  })

  it('renders content of date', () => {
    renderSingleJobOffer(propsData)

    expect(screen.getByText('Some date')).toBeInTheDocument()
  })
})
