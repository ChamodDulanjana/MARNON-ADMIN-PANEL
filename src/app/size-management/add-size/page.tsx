import React, {useEffect, useState} from "react";
import {addToast, Form, Input} from "@heroui/react";
import BottomButtons from "@/components/bottom-buttons/BottomButtons.tsx";
import {getSizeById, saveSize, updateSize} from "@/services/sizeService.ts";
import type {SizeSaveDTO} from "@/models/SizeSaveDTO.ts";
import {useNavigate, useParams} from "react-router-dom";
import type {SizeGetDTO} from "@/models/SizeGetDTO.ts";

const backUrl = "/admin-panel/sizes/view-sizes";

const AddSize = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [size, setSize] = useState('');
    const [isSizeInvalid, setIsSizeInvalid] = useState(false);

    // Retrieve size details if in edit mode (id is present)
    useEffect(() => {
        if (id){
            getSizeById(parseInt(id)).then(res => {
                if (res.statusCode === 200) {
                    const sizeData: SizeGetDTO = res.data;
                    setSize(sizeData.size);
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while fetching size details.",
                    color: "danger",
                })
            });
        }
    }, [id]);

    // handle save
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Simple validation
        if (!size || size.trim() === '') {
            setIsSizeInvalid(true);
            return;
        }

        // Prepare DTO
        const sizeSaveDTO: SizeSaveDTO = {
            size: size,
        };

        if (!id){
            // Save new size
            saveSize(sizeSaveDTO).then(res => {
                if (res.statusCode === 201) {
                    addToast({
                        title: "Success!",
                        description: "Size added successfully.",
                        color: "success",
                    })
                    navigate(`${backUrl}`)
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while adding size.",
                    color: "danger",
                })
            });
        } else {
            // Update existing size
            updateSize(parseInt(id), sizeSaveDTO).then(res => {
                if (res.statusCode === 200) {
                    addToast({
                        title: "Success!",
                        description: "Size updated successfully.",
                        color: "success",
                    })
                    navigate(`${backUrl}`)
                }
            }).catch(err => {
                const backendResponse = err.response?.data;
                addToast({
                    title: "Error!",
                    description: backendResponse.message || "An error occurred while updating size.",
                    color: "danger",
                })
            });
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <Input
                label={"Size*"}
                labelPlacement="outside-top"
                type="text"
                placeholder="Enter size"
                className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:outline"
                errorMessage="Please enter a valid size."
                isInvalid={isSizeInvalid}
                value={size}
                onValueChange={(value) => {
                    setSize(value);
                    if (value.trim() === '') {
                        setIsSizeInvalid(true);
                    } else {
                        setIsSizeInvalid(false);
                    }
                }}
            />

            {/*Save and back buttons*/}
            <BottomButtons backUrl={backUrl} mode={id ? 'edit' : 'new'}/>
        </Form>
    );
};

export default AddSize;