import { render, screen } from '@testing-library/vue'
import { RouterLinkStub } from '@vue/test-utils'

import type { Job } from '@/api/types'
import SingleJobOffer from '@/components/JobView/SingleJobOffer.vue'
import { createJob } from 'tests/utils/createJob'

import SingleJobOffer from '@/components/JobView/SingleJobOffer.vue'

describe('SingleJobOffer', () => {
  it('renders content of job offer', () => {
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

    renderSingleJobOffer({
      id: 1,
      title: 'Vue Developer'
    })
  })
})
