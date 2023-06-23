import { render, screen } from '@testing-library/vue'
import axios from 'axios'

import SpotLight from '@/components/JobSearch/SpotLight.vue'

vi.mock('axios')

describe('SpotLight', () => {
  it('provides image, title and description to parent component', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          img: 'Some image',
          title: 'Some title',
          description: 'Some description'
        }
      ]
    })

    render(SpotLight, {
      slots: {
        default: `<template #default="slotProps">
                    <h2>{{ slotProps.title }}</h2>
                    <h1> {{ slotProps.img }} </h1>
                    <p>{{ slotProps.description }}</p>
                </template>`
      }
    })

    const imageText = await screen.findByText('Some image')
    const titleText = await screen.findByText('Some title')
    const descriptionText = await screen.findByText('Some description')

    expect(imageText).toBeInTheDocument()
    expect(titleText).toBeInTheDocument()
    expect(descriptionText).toBeInTheDocument()
  })
})
