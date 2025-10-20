import React, {useState} from "react";
import {addToast, Form, Input} from "@heroui/react";
import BottomButtons from "@/components/bottom-buttons/BottomButtons.tsx";
import {saveSize} from "@/services/sizeService.ts";
import type {SizeSaveDTO} from "@/models/size/SizeSaveDTO.ts";
import {useNavigate} from "react-router-dom";

const backUrl = "/admin-panel/sizes/view-sizes";

const AddSize = () => {
    const navigate = useNavigate();
    const [isSizeInvalid, setIsSizeInvalid] = useState(false);

    // handle save
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget));
        const size = data.size as string;

        // Simple validation
        if (!size || size.trim() === '') {
            setIsSizeInvalid(true);
            return;
        }

        // Prepare DTO
        const sizeSaveDTO: SizeSaveDTO = {
            size: size,
        };

        // Call size service
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
    };


    return (
        <Form onSubmit={onSubmit}>
            <Input
                name="size"
                label={"Size*" }
                labelPlacement="outside-top"
                type="text"
                placeholder="Enter size"
                className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:outline"
                errorMessage="Please enter a valid size."
                isInvalid={isSizeInvalid}
                onValueChange={(value) => {
                    if (value.trim() === '') {
                        setIsSizeInvalid(true);
                    } else {
                        setIsSizeInvalid(false);
                    }
                }}
            />

            {/*Save and back buttons*/}
            <BottomButtons backUrl={backUrl}/>
        </Form>
    );
};

export default AddSize;