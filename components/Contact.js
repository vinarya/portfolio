import React, { useState, useEffect } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    //e.preventDefault()
    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: '',
    })
    // Show the modal
    setShowModal(true)
  }

  const checkFormValidity = () => {
    const { name, email, message } = formData
    if (name && email && message) {
      setIsSubmitEnabled(true)
    } else {
      setIsSubmitEnabled(false)
    }
  }

  useEffect(() => {
    checkFormValidity()
  }, [formData])

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <form
        action="https://formsubmit.co/2e37943de36df6d6a7c3687cb5a3eee9"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="my-4">
          <label htmlFor="name" className="my-2 block font-medium text-gray-900 dark:text-gray-100">
            Name <sup>*</sup>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Enter Your Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <input type="hidden" name="_subject" value="New submission!" />
        <input type="hidden" name="_captcha" value="false" />
        <div className="mb-4">
          <label
            htmlFor="email"
            className="my-2 block font-medium text-gray-900 dark:text-gray-100"
          >
            Email <sup>*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Enter Your Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="my-2 block font-medium text-gray-900 dark:text-gray-100"
          >
            Message <sup>*</sup>
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Enter Your Message"
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <input type="hidden" name="_subject" value="New submission!" />
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="submit"
          value="Submit"
          className={`${
            isSubmitEnabled ? 'bg-teal-500' : 'cursor-not-allowed bg-gray-400 dark:bg-gray-500'
          } rounded px-2 py-1  text-white`}
          disabled={!isSubmitEnabled}
        />
      </form>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="rounded-xl border bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
            <button onClick={() => setShowModal(false)} className="float-right">
              <span role="img" aria-label="Close">
                ❌
              </span>
            </button>
            <div className="m-5 ">
              <p>Message has been sent</p>
              <p>I will get back to you asap!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
